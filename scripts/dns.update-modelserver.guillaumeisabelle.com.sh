#!/bin/bash

# data=10.10.23.198
ipaddr=$1

# Update the DNS  modelserver.guillaumeisabelle.com
wget http://directnic.com/dns/gateway/36ed0d9349357da424646c2e3b1fa4341d4cba24f80aa3882f3dc1448553f36e/?data=$ipaddr > $TMP/36ed0d9349357da424646c2e3b1fa4341d4cba24f80aa3882f3dc1448553f36e.dnsupdate.txt


