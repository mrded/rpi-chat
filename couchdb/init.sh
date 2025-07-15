#!/bin/bash

# Wait for CouchDB to start
sleep 10

# Create system databases
curl -X PUT http://admin:password@couchdb:5984/_users
curl -X PUT http://admin:password@couchdb:5984/_replicator
curl -X PUT http://admin:password@couchdb:5984/_global_changes

# Create application database
curl -X PUT http://admin:password@couchdb:5984/rpi-chat

# Enable CORS
curl -X PUT http://admin:password@couchdb:5984/_node/nonode@nohost/_config/httpd/enable_cors -d '"true"'
curl -X PUT http://admin:password@couchdb:5984/_node/nonode@nohost/_config/cors/origins -d '"*"'
curl -X PUT http://admin:password@couchdb:5984/_node/nonode@nohost/_config/cors/credentials -d '"true"'
curl -X PUT http://admin:password@couchdb:5984/_node/nonode@nohost/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT http://admin:password@couchdb:5984/_node/nonode@nohost/_config/cors/headers -d '"accept, authorization, content-type, origin"'
