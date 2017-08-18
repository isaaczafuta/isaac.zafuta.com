import React, { Component } from 'react';

import Navigation from "../../../components/layout/Navigation";
import Page from "../../../components/layout/Page";


class WritingInstallingPacaur extends Component {

    render = () => {
        return (
            <Page title="Installing Pacaur">
                <Navigation/>
                <section className="hero is-danger">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Installing Pacaur
                            </h1>
                            <h2 className="subtitle">
                                Quickly installing a nice AUR helper
                            </h2>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <section className="content">
                        <br/>
                        <h2>Installing Pacaur</h2>
                        <p>Instaling <code>pacaur</code> is easy, but I often find myself on a fresh system and just want a one-click way to install it. Here's what I usually copy-paste:</p>

                        <blockquote>
                            <code><span className="is-unselectable">$ </span>sudo pacman -Syu</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>sudo pacman -S expac yajl git --needed</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>mkdir -p /tmp/pacaur</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>cd /tmp/pacaur</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>gpg --recv-keys --keyserver hkp://pgp.mit.edu 1EB2638FF56C0C53</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>curl -o PKGBUILD https://aur.archlinux.org/cgit/aur.git/plain/PKGBUILD?h=cower</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>makepkg -i PKGBUILD</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>curl -o PKGBUILD https://aur.archlinux.org/cgit/aur.git/plain/PKGBUILD?h=pacaur</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>makepkg -i PKGBUILD</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>cd ~</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>rm -r /tmp/pacaur</code>
                        </blockquote>

                        <br /><br /><br /><br />

                    </section>
                </div>
            </Page>
        );
    };
}

export default WritingInstallingPacaur;
