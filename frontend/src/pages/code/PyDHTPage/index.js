import React from 'react';

import Navigation from "../../../components/layout/Navigation";
import Page from "../../../components/layout/Page";

class PyDHTPage extends React.Component {

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

export {
  PyDHTPage,
};
