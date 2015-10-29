# tokens_node
Tokens microservice implemented in Node.js as a cool experiment

### Installation
Install node modules:

        npm install

Install mongodb and start it

Install cirrus and run it

Install new-ui and run it

Start microservice:

      node app.js

### Test it
Using swagger: http://localhost:3000/doc-api/

Using curl:

curl -v -X POST --header "Content-Type: application/json" --cookie
"localhost%3A9292_session_id=b19e53301aff5bfea16823bc07fa52a1" --header
"Accept: application/json" -d '{"content":"content", "type":"login",
"maxAge":99 }' 'http://localhost:9000/tokens'


