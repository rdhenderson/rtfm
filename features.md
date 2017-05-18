# RTFM Feature Specification
<p> The goal of our project is to simplify and improve the process for finding example code, explanations and documentation while coding. </p>
* Providing a unified view of multiple sources (to limit tab proliferation)
  - MDN (web scraper)
  - W3Schools
  - Stack Overflow (Stackexhange API)
  - Module/Framework Documentation 
* Implement fuzzy search of documentation/code examples
  - Discuss issues about access to data with Nathan

#Minimum Shippable Product
* The minimum shippable product will allow:
  - fuzzy search of at least one api/framework/module's documentation
  - display top 5 documentation, stacks, and mdn responses to a user search
  - advance search modal to customize search and response

# Bonus Features
* Error message parsing/searching 
  - Simple method to take in error message and return top results related to that error
  - Bonus points for limiting search to specific technologies
  - ATOM plugin to send error message to our API and send back top 5 stack responses
  
# Technical Specs
* Frontend Technologies (Add version information when selected)
  - HTML 5
  - CSS (LESS OR SASS?)
  - Javascript/Jquery
  - Bootstrap 
  - Handlebars
* Backend Technologies
  - Javascript/Node.js
  - Express
  - Handlebars (?)
* Testing 
  - Mocha/Chai
  
