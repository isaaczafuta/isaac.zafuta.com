import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

import { generateSTL } from "./utils";

import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const useStyles = makeStyles((theme) => ({
  viewer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flex: 1,
    flexShrink: 1,
    overflow: "hidden",
  },
}));

interface Props {
  script: string;
  params: object;
}

var loader = new STLLoader();

const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      resolve(this.result as ArrayBuffer);
    };
    fileReader.onerror = (e) => {
      reject();
    };
    fileReader.readAsArrayBuffer(blob);
  });
};

const fitCameraToObject = function (
  camera: any,
  object: any,
  offset?: any,
  controls?: any
) {
  offset = offset || 1.25;

  const boundingBox = new THREE.Box3();

  // get bounding box of object - this will be used to setup controls and camera
  boundingBox.setFromObject(object);

  const center = new THREE.Vector3();
  boundingBox.getCenter(center);

  const size = new THREE.Vector3();

  boundingBox.getSize(size);

  // get the max side of the bounding box (fits to width OR height as needed )
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

  cameraZ *= offset; // zoom out a little so that objects don't fill the screen

  camera.position.z = cameraZ;

  const minZ = boundingBox.min.z;
  const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

  camera.far = cameraToFarEdge * 3;
  camera.updateProjectionMatrix();

  if (controls) {
    // set camera to rotate around center of loaded object
    controls.target = center;

    // prevent camera from zooming out far enough to create far plane cutoff
    controls.maxDistance = cameraToFarEdge * 2;

    // controls.saveState();
  } else {
    camera.lookAt(center);
  }
};

export const Viewer: React.FC<Props> = ({ script, params }) => {
  const classes = useStyles();

  const viewerDiv = useRef<HTMLDivElement>(null);

  const scene = useRef<THREE.Scene | null>();

  const camera = useRef<THREE.PerspectiveCamera | null>();
  const controls = useRef<TrackballControls | null>();
  const model = useRef<THREE.Mesh | null>();
  const renderer = useRef<THREE.WebGLRenderer | null>();

  useEffect(() => {
    scene.current = new THREE.Scene();
    scene.current.background = new THREE.Color(0xffffff);

    var light = new THREE.DirectionalLight(0xffffff, 0.25);
    light.position.set(0, 0, 10);
    scene.current.add(light);

    var light3 = new THREE.AmbientLight(0xffffff, 0.5);
    scene.current.add(light3);

    var grid = new THREE.GridHelper(350, 20, 0xee4bb5, 0xee4bb5);
    grid.geometry.rotateX(Math.PI / 2);
    scene.current.add(grid);

    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(
      viewerDiv.current!.clientWidth,
      viewerDiv.current!.clientHeight
    );
    viewerDiv.current!.appendChild(renderer.current.domElement);

    var aspect =
      viewerDiv.current!.clientWidth / viewerDiv.current!.clientHeight;
    camera.current = new THREE.PerspectiveCamera();
    camera.current.position.z = 500;
    camera.current.aspect = aspect;
    camera.current.updateProjectionMatrix();

    controls.current = new TrackballControls(
      camera.current,
      renderer.current.domElement
    );
    controls.current.rotateSpeed = 2;

    controls.current.keys = [65, 83, 68];

    function animate() {
      requestAnimationFrame(animate);
      controls.current!.update();
      render();
    }

    function render() {
      renderer.current!.render(scene.current!, camera.current!);
    }

    animate();

    return () => {
      // todo: cleanup
    };
  }, []);

  useEffect(() => {
    const updateScene = async () => {
      const stlBlob = await generateSTL(script, params);
      const arrayBuffer = await blobToArrayBuffer(stlBlob);

      const geo2 = loader.parse(arrayBuffer);
      var material2 = new THREE.MeshPhongMaterial({
        color: 0x3cb5ff,
        specular: 0x080808,
        shininess: 200,
      });
      var mesh2 = new THREE.Mesh(geo2, material2);

      mesh2.position.set(0, 0, 0);
      mesh2.rotation.set(0, 0, 0);
      mesh2.scale.set(1, 1, 1);

      mesh2.castShadow = true;
      mesh2.receiveShadow = true;

      const firstModelRender = !model.current;
      if (model.current) {
        scene.current!.remove(model.current);
      }
      model.current = mesh2;
      scene.current!.add(mesh2);
      if (firstModelRender) {
        fitCameraToObject(camera.current, mesh2, 1.25, controls.current);
      }
    };

    updateScene();
  }, [params, script]);

  useEffect(() => {
    const listener = () => {
      var aspect =
        viewerDiv.current!.clientWidth / viewerDiv.current!.clientHeight;
      camera.current!.aspect = aspect;
      camera.current!.updateProjectionMatrix();

      renderer.current!.setSize(
        viewerDiv.current!.clientWidth,
        viewerDiv.current!.clientHeight
      );
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  });

  return <div className={classes.viewer} ref={viewerDiv} />;
};
