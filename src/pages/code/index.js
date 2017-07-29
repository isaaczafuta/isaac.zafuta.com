import React, { Component } from 'react';

import Navigation from "../../components/layout/Navigation/index";
import Page from "../../components/layout/Page/index";

import ProjectOverview from '../../components/ProjectOverview/index';

// import headphones from './headphones.svg';
// import tag from './tag.svg';
// import turntable from './turntable.svg';

class Code extends Component {
  render() {

    // const projects = [
    //   {
    //     title: "pydht",
    //     description: "Distributed Hash Table for Python",
    //     image: turntable,
    //     link: "/code",
    //     github: "https://github.com/isaaczafuta/pydht"
    //   },
    //   {
    //     title: "whatapi",
    //     description: "Convenient wrapper for the What.CD API",
    //     image: headphones,
    //     link: "/code",
    //     github: "https://github.com/isaaczafuta/whatapi"
    //   },
    //   {
    //     title: "pyflacmeta",
    //     description: "FLAC metadata reader in pure python",
    //     image: tag,
    //     link: "/code",
    //     github: "https://github.com/isaaczafuta/pyflacmeta"
    //   }
    // ]

    const projects = []

    return (
      <Page>
        <Navigation/>
        <div className="Code">
          {/*<h1>Projects</h1>*/}
          {
            projects.map((project) => <ProjectOverview key={project.title}
                                                       title={project.title}
                                                       description={project.description}
                                                       image={project.image}
                                                       link={project.link}
                                                       github={project.github} />)
          }
        </div>
      </Page>
    );
  }
}

export default Code;
