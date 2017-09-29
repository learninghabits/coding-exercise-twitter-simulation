# Coding Exercise (Twitter Simulation)

The aim of this application is to simulate twitter feeds using files. The challenge is to read raw data from a text file, format it as objects, and display an aggregated list of tweets for each user (twitter handle) and people they follow. 

## Content  

* Input
* Output
* Assumptions
* Requirements
* Running the application

## Input  

Input to the application consists of two files. The users file and the tweets file.  

### The users file 

    A well-formed line will follow a pattern like this: [USER follows A, B, C] where USER represents a twitter handle and A, B,C represents a list of twitter handles they follow.
    e.g. @Tshepo follows @Jeff, @Travis, @UncleBob

### The tweets file

    A well-formed line will follow a patter like this: [USER> MESSAGE] where USER represents a twitter handler and a MESSAGE represents a message (of up to 140 chars) they tweeted.

 ## Output  

 The output of the application is a result of doing the following:
 
 1. Matching users and their tweets
 2. Grouping user's tweets and their follows' tweets
 3. Displaying the grouped data on a console.  

### Output format

USER   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tab> USER: MESSAGE   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tab> USER: MESSAGE   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tab> USER: MESSAGE   
USER   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tab> USER: MESSAGE   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tab> USER: MESSAGE   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tab> USER: MESSAGE   

## Assumptions  

1. All users will be twitter handles

## Requirements  

Any nodejs LTS that hasn't reached end-of-line will do. At the date of writing (2015-09-29) such versions are 4.x (Argon) and 6.x (Boron).

https://nodejs.org

## Running the application  

### Linux Based OS

1. Navigate to your local GIT directory (folder)
2. Open the terminal 
3. > npm install 
4. > sudo node app.js  users.txt tweets.txt

### Windows Based OS

1. Navigate to your local GIT directory (folder)
2. Open the the command line 
3. > npm install 
4. > node app.js  users.txt tweets.txt
