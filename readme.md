# distributed-fizzbuzz
A NodeJs based distributed FizzBuzz implementation that was mostly just used for some practice.

# Overview
This is a client server, TCP based distributed system. The server is meant to be a message processor and currently it's only implementing one message type, FizzBuzz. The idea is that this code could evolve over time to implement other message types.

# Running the code
First install dependencies
```
npm install
```

Next start a server
```
npm run start-server
```

Then in a seperate terminal window start a client
```
npm run start-client
```

#Demo
![fizzbuzzdemo](https://cloud.githubusercontent.com/assets/10080111/20868440/9616676e-ba21-11e6-8e39-458b8ee151f6.gif)

#Ways to improve the code
1. Add types using Flow or Typescript. On front end apps I don't miss types but for a messaging app like this I think you could simplify the code a good bit by using implicit types instead of ```ClassName.type``` to resolve the mapping between message types and message handler types.
1. Make the message processor more generic. Some options include:
   1. Have it pull all it's processing strategies from a directoy using require
   1. Have it be config driven from either a file or DB that would provide the supported processors and then use require to load them on demand
1. Consider strategies for taking processing out of the message server because if you load a message processor that runs long the queue will block
1. Add some tests :)

