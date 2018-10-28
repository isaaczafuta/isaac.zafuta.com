import React from 'react';
import {Link} from 'react-router-dom';

import {Page} from "../../../components/layout/Page";
import {Navigation} from "../../../components/layout/Navigation";

import pydht from "./pydht.svg";

class PyDHTPageOld extends React.Component {

  render() {
    return (
      <Page title="pydht">
        <Navigation/>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                pydht
              </h1>
              <h2 className="subtitle">
                A distributed hash table in python
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title">What is it?</h1>
            <p>A distributed hash table can be used much like a regular dictionary, but the keys and values are distributed across multiple nodes. Notes in the DHT will automatically discover additional nodes as needed, and will adapt when nodes go offline. Key-values will be distributed according to a set of rules, and automatically re-distributed among the nodes as the network of nodes evolves.</p>
          </div>
        </section>
        <hr/>
        <section className="section">
          <div className="container">
            <h1 className="title">How do I use it?</h1>
            <p>Just create a DHT object, and bootstrap it with the address of an existing host. Then read and write keys-values on the DHT object, and your objects will be distributed out on the network. By participating in this network, you automatically join the keyspace and become responsible for storing some of the key-values as well.</p>
            <br/>
            <pre>{`>>> from pydht import DHT
>>> host1, port1 = 'localhost', 3000
>>> dht1 = DHT(host1, port1)
>>>
>>> host2, port2 = 'localhost', 3001
>>> dht2 = DHT(host2, port2, boot_host=host1, boot_port=port1)
>>>
>>> dht1["my_key"] = [u"My", u"json-serializable", u"Object"]
>>>
>>> print dht2["my_key"]
[u'My', u'json-serializable', u'Object']`}
            </pre>
          </div>
        </section>
      </Page>
    );
  }

}


const PyDHTPage = () => (
  <Page title="Code">
    <div className="pydht-page">
      <Navigation/>
      <section className="section container">
        <header className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img alt="" src={pydht}/>
            </p>
          </figure>
          <div className="media-content">
            <h1 className="title">pydht</h1>
            <h3 className="subtitle">A distributed hash table in python.</h3>
          </div>
          <figure className="media-right">
            <a className="button" href="https://github.com/isaaczafuta/pydht" target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <i className="fa fa-github"/>
              </span>
              <span>View on GitHub</span>
            </a>
          </figure>
        </header>
        <hr/>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/code">Code</Link></li>
            <li className="is-active"><Link to="/code/pydht">pydht</Link></li>
          </ul>
        </nav>
        <section className="content">
          <p><strong>pydht</strong> is a simple distributed hash table implementation in python.</p>
          <p>A distributed hash table can be used much like a regular dictionary, but the keys and values are distributed across multiple nodes. Notes in the DHT will automatically discover additional nodes as needed, and will adapt when nodes go offline. Key-values will be distributed according to a set of rules, and automatically re-distributed among the nodes as the network of nodes evolves.</p>
          <hr/>
          <p><strong>Example usage:</strong></p>
          <blockquote>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>from pydht import DHT</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>></span></code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>host1, port1 = 'localhost', 3000</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>dht1 = DHT(host1, port1)</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>></span></code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>host2, port2 = 'localhost', 3001</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>dht2 = DHT(host2, port2)</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>></span></code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>dht1["my_key"] = [u"My", u"json-serializable", u"Object"]</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>print dht1["my_key"]</code>
            <br/>
            <code><span className="is-unselectable">[u"My", u"json-serializable", u"Object"]</span></code>
          </blockquote>
        </section>
      </section>
    </div>
  </Page>
);

export {
  PyDHTPage,
};
