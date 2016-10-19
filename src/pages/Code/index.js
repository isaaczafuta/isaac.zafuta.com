import React, { Component } from 'react';
import Body from "../../components/Body";
import Navigation from "../../components/Navigation";
import Page from "../../components/Page";
import ProjectOverview from '../../components/ProjectOverview';

import './style.css';

import headphones from './headphones.svg';
import tag from './tag.svg';
import turntable from './turntable.svg';

class Code extends Component {
  render() {

    const projects = [
      {
        title: "pydht",
        description: "Distributed Hash Table for Python",
        image: turntable,
        link: "/code",
        github: "https://github.com/isaaczafuta/pydht"
      },
      {
        title: "whatapi",
        description: "Convenient wrapper for the What.CD API",
        image: headphones,
        link: "/code",
        github: "https://github.com/isaaczafuta/whatapi"
      },
      {
        title: "pyflacmeta",
        description: "FLAC metadata reader in pure python",
        image: tag,
        link: "/code",
        github: "https://github.com/isaaczafuta/pyflacmeta"
      }
    ]

    return (
      <Page>
        <Navigation/>
        <Body>
          <div className="Code">
            <h1>Projects</h1>
            {
              projects.map((project) => <ProjectOverview key={project.title}
                                                         title={project.title}
                                                         description={project.description}
                                                         image={project.image}
                                                         link={project.link}
                                                         github={project.github} />)
            }
          </div>
        </Body>
      </Page>
    );
  }
}

export default Code;
