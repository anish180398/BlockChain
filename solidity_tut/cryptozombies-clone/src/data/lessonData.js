const lessonData = [
  {
    chapter: 1,
    title: "Lesson Overview",
    description: "Introduction to the Zombie Factory project and how zombie DNA works.",
    content: [
      "<h1>Chapter 1: Lesson Overview</h1>",
      "<p>In Lesson 1, you're going to build a \"Zombie Factory\" to build an army of zombies.</p>",
      "<ul><li>Our factory will maintain a database of all zombies in our army</li><li>Our factory will have a function for creating new zombies</li><li>Each zombie will have a random and unique appearance</li></ul>",
      "<p>In later lessons, we'll add more functionality, like giving zombies the ability to attack humans or other zombies! But before we get there, we have to add the basic functionality of creating new zombies.</p>",
      {
        type: "task",
        title: "How Zombie DNA Works",
        items: [
          "The zombie's appearance will be based on its \"Zombie DNA\". Zombie DNA is simple — it's a 16-digit integer, like: 8356281049284737",
          "Just like real DNA, different parts of this number will map to different traits. The first 2 digits map to the zombie's head type, the second 2 digits to the zombie's eyes, etc."
        ]
      },
      {
        type: "note",
        content: "For this tutorial, we've kept things simple, and our zombies can have only 7 different types of heads (even though 2 digits allow 100 possible options). Later on we could add more head types if we wanted to increase the number of zombie variations."
      },
      "For example, the first 2 digits of our example DNA above are <code>83</code>. To map that to the zombie's head type, we do <code>83 % 7 + 1</code> = 7. So this Zombie would have the 7th zombie head type (the Santa hat).",
      "<p>In the panel to the right, go ahead and move the <span style='color: #AD26AD;'>head</span> gene slider to the 7th head (the Santa hat) to see what trait the 83 would correspond to.</p>",
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "Play with the sliders on the right side of the page. Experiment to see how the different numerical values correspond to different aspects of the zombie's appearance."
        ]
      },
      "<p>Ok, enough playing around. When you're ready to continue, hit \"Next Chapter\" below, and let's dive into learning Solidity!</p>"
    ],
    initialCode: "",
    solutionCode: "",
    hint: "Just play with the sliders to see how different DNA values affect the zombie's appearance. No code needed for this chapter."
  },
  {
    chapter: 2,
    title: "Contracts",
    description: "Learn about Solidity contracts, the building blocks of Ethereum applications.",
    content: [
      "<h1>Chapter 2: Contracts</h1>",
      "<p>Starting with the absolute basics:</p>",
      "<p>Solidity's code is encapsulated in <b>contracts</b>. A <code>contract</code> is the fundamental building block of Ethereum applications — all variables and functions belong to a contract, and this will be the starting point of all your projects.</p>",
      "<p>An empty contract named <code>HelloWorld</code> would look like this:</p>",
      {
        type: "code",
        code: "contract HelloWorld {\n\n}",
        language: "solidity"
      },
      "<h2>Version Pragma</h2>",
      "<p>All solidity source code should start with a \"version pragma\" — a declaration of the version of the Solidity compiler this code should use. This is to prevent issues with future compiler versions potentially introducing changes that would break your code.</p>",
      "<p>For the scope of this tutorial, we'll want to be able to compile our smart contracts with any compiler version in the range of 0.5.0 (inclusive) to 0.6.0 (exclusive). It looks like this:</p>",
      {
        type: "code",
        code: "pragma solidity >=0.5.0 <0.6.0;",
        language: "solidity"
      },
      "<p>Putting it together, here is a bare-bones starting contract — the first thing you'll write every time you start a new project:</p>",
      {
        type: "code",
        code: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract HelloWorld {\n\n}",
        language: "solidity"
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "To start creating our Zombie army, let's create a base contract called <code>ZombieFactory</code>.",
          "In the box to the right, make it so our contract uses solidity version <code>>=0.5.0 <0.6.0</code>.",
          "Create an empty contract called <code>ZombieFactory</code>."
        ]
      }
    ],
    initialCode: "pragma solidity //... Enter solidity version here\n\n//... Create contract here",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n}",
    hint: "Make sure to use the correct pragma syntax: 'pragma solidity >=0.5.0 <0.6.0;' and create a contract named ZombieFactory with opening and closing braces."
  },
  {
    chapter: 3,
    title: "State Variables & Integers",
    description: "Learn about state variables and how Solidity deals with integers.",
    content: [
      "<h1>Chapter 3: State Variables & Integers</h1>",
      "<p>Great job! Now that we've got a shell for our contract, let's learn about how Solidity deals with variables.</p>",
      "<p><b>State variables</b> are permanently stored in contract storage. This means they're written to the Ethereum blockchain. Think of them like writing to a DB.</p>",
      "<h2>Example:</h2>",
      {
        type: "code",
        code: "contract Example {\n  // This will be stored permanently in the blockchain\n  uint myUnsignedInteger = 100;\n}",
        language: "solidity"
      },
      "<p>In this example contract, we created a <code>uint</code> called <code>myUnsignedInteger</code> and set it equal to 100.</p>",
      "<h2>Unsigned Integers: <code>uint</code></h2>",
      "<p>The <code>uint</code> data type is an unsigned integer, meaning its value must be non-negative. There's also an <code>int</code> data type for signed integers.</p>",
      {
        type: "note",
        content: "In Solidity, <code>uint</code> is actually an alias for <code>uint256</code>, a 256-bit unsigned integer. You can declare uints with less bits — <code>uint8</code>, <code>uint16</code>, <code>uint32</code>, etc. But in general you want to simply use <code>uint</code> except in specific cases, which we'll talk about in later lessons."
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "Our Zombie DNA is going to be determined by a 16-digit number.",
          "Declare a <code>uint</code> named <code>dnaDigits</code>, and set it equal to <code>16</code>."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    //start here\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n\n}",
    hint: "Declare a uint variable called dnaDigits and set it equal to 16. Make sure to end the line with a semicolon."
  },
  {
    chapter: 4,
    title: "Math Operations",
    description: "Learn about math operations in Solidity.",
    content: [
      "<h1>Chapter 4: Math Operations</h1>",
      "<p>Math in Solidity is pretty straightforward. The following operations are the same as in most programming languages:</p>",
      "<ul>",
      "<li>Addition: <code>x + y</code></li>",
      "<li>Subtraction: <code>x - y</code></li>",
      "<li>Multiplication: <code>x * y</code></li>",
      "<li>Division: <code>x / y</code></li>",
      "<li>Modulus / remainder: <code>x % y</code> (for example, <code>13 % 5</code> is <code>3</code>, because if you divide 13 by 5, 3 is the remainder)</li>",
      "</ul>",
      "<p>Solidity also supports an <a href='https://en.wikipedia.org/wiki/Exponentiation' target='_blank'>exponential operator</a> (i.e. \"x to the power of y\", x^y):</p>",
      {
        type: "code",
        code: "uint x = 5 ** 2; // equal to 5^2 = 25",
        language: "solidity"
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "To make sure our Zombie's DNA is only 16 characters, let's make another <code>uint</code> equal to 10^16. That way we can later use the modulus operator <code>%</code> to shorten an integer to 16 digits.",
          "Create a <code>uint</code> named <code>dnaModulus</code>, and set it equal to <b>10</b> to the power of <code>dnaDigits</code>."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    //start here\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n}",
    hint: "Use the exponential operator (**) to set dnaModulus equal to 10 raised to the power of dnaDigits."
  },
  {
    chapter: 5,
    title: "Structs",
    description: "Learn how to create more complex data types using structs.",
    content: [
      "<h1>Chapter 5: Structs</h1>",
      "<p>Sometimes you need a more complex data type. For this, Solidity provides <code>structs</code>:</p>",
      {
        type: "code",
        code: "struct Person {\n  uint age;\n  string name;\n}",
        language: "solidity"
      },
      "<p>Structs allow you to create more complicated data types that have multiple properties.</p>",
      {
        type: "note",
        content: "Note that we just introduced a new type, <code>string</code>. Strings are used for arbitrary-length UTF-8 data. Ex. <code>string greeting = \"Hello world!\"</code>"
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "In our app, we're going to want to create some zombies! And zombies will have multiple properties, so this is a perfect use case for a struct.",
          "Create a <code>struct</code> named <code>Zombie</code>.",
          "Our <code>Zombie</code> struct will have 2 properties: <code>name</code> (a <code>string</code>), and <code>dna</code> (a <code>uint</code>)."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    // start here\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n}",
    hint: "Create a struct called Zombie with two properties: a string called name and a uint called dna."
  },
  {
    chapter: 6,
    title: "Arrays",
    description: "Learn how to work with collections using arrays in Solidity.",
    content: [
      "<h1>Chapter 6: Arrays</h1>",
      "<p>When you want a collection of something, you can use an <code>array</code>. There are two types of arrays in Solidity: <b>fixed</b> arrays and <b>dynamic</b> arrays:</p>",
      {
        type: "code",
        code: "// Array with a fixed length of 2 elements:\nuint[2] fixedArray;\n// another fixed Array, can contain 5 strings:\nstring[5] stringArray;\n// a dynamic Array - has no fixed size, can keep growing:\nuint[] dynamicArray;",
        language: "solidity"
      },
      "<p>You can also create an array of <b>structs</b>. Using the previous chapter's <code>Person</code> struct:</p>",
      {
        type: "code",
        code: "Person[] people; // dynamic Array, we can keep adding to it",
        language: "solidity"
      },
      "<p>Remember that state variables are stored permanently in the blockchain? So creating a dynamic array of structs like this can be useful for storing structured data in your contract, kind of like a database.</p>",
      "<h2>Public Arrays</h2>",
      "<p>You can declare an array as <code>public</code>, and Solidity will automatically create a <code>getter</code> method for it. The syntax looks like:</p>",
      {
        type: "code",
        code: "Person[] public people;",
        language: "solidity"
      },
      "<p>Other contracts would then be able to read from, but not write to, this array. So this is a useful pattern for storing public data in your contract.</p>",
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "We're going to want to store an army of zombies in our app. And we're going to want to show off all our zombies to other apps, so we'll want it to be public.",
          "Create a public array of <code>Zombie</code> <b>structs</b>, and name it <code>zombies</code>."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    // start here\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n}",
    hint: "Declare a public array of Zombie structs called zombies. Remember to use the public keyword."
  },
  {
    chapter: 7,
    title: "Function Declarations",
    description: "Learn how to declare and use functions in Solidity.",
    content: [
      "<h1>Chapter 7: Function Declarations</h1>",
      "<p>A function declaration in solidity looks like the following:</p>",
      {
        type: "code",
        code: "function eatHamburgers(string memory _name, uint _amount) public {\n\n}",
        language: "solidity"
      },
      "<p>This is a function named <code>eatHamburgers</code> that takes 2 parameters: a <code>string</code> and a <code>uint</code>. For now the body of the function is empty. Note that we're specifying the function visibility as <code>public</code>. We're also providing instructions about where the <code>_name</code> variable should be stored- in <code>memory</code>. This is required for all reference types such as arrays, structs, mappings, and <code>strings</code>.</p>",
      "<p>What is a reference type you ask?</p>",
      "<p>Well, there are two ways in which you can pass an argument to a Solidity function:</p>",
      "<ul>",
      "<li>By value, which means that the Solidity compiler creates a new copy of the parameter's value and passes it to your function. This allows your function to modify the value without worrying that the value of the initial parameter gets changed.</li>",
      "<li>By reference, which means that your function is called with a... reference to the original variable. Thus, if your function changes the value of the variable it receives, the value of the original variable gets changed.</li>",
      "</ul>",
      {
        type: "note",
        content: "It's convention (but not required) to start function parameter variable names with an underscore (_) in order to differentiate them from global variables. We'll use that convention throughout our tutorial."
      },
      "<p>You would call this function like so:</p>",
      {
        type: "code",
        code: "eatHamburgers(\"vitalik\", 100);",
        language: "solidity"
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "In our app, we're going to need to be able to create some zombies. Let's create a function for that.",
          "Create a <code>public</code> function named <code>createZombie</code>. It should take two parameters: <code>_name</code> (a <code>string</code>), and <code>_dna</code> (a <code>uint</code>). Don't forget to pass the first argument by using the <code>memory</code> keyword",
          "Leave the body empty for now — we'll fill it in later."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    // start here\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function createZombie(string memory _name, uint _dna) public {\n\n    }\n\n}",
    hint: "Create a function named createZombie with the public visibility modifier. It should take two parameters: a string memory named _name and a uint named _dna."
  },
  {
    chapter: 8,
    title: "Working with Structs and Arrays",
    description: "Learn how to create new structs and add them to arrays.",
    content: [
      "<h1>Chapter 8: Working with Structs and Arrays</h1>",
      "<p>Now that we have our <code>Zombie</code> struct and our zombies array, let's learn how to create new zombies and add them to our array.</p>",
      "<h2>Creating New Structs</h2>",
      "<p>Let's see how to create a new <code>Person</code> struct:</p>",
      {
        type: "code",
        code: "Person satoshi = Person(172, \"Satoshi\");",
        language: "solidity"
      },
      "<p>We can also initialize a struct by using key/value mapping:</p>",
      {
        type: "code",
        code: "Person satoshi = Person({name: \"Satoshi\", age: 172});",
        language: "solidity"
      },
      "<p>Notice how the order doesn't matter here!</p>",
      "<h2>Adding to Arrays</h2>",
      "<p>Remember our array of people from the previous chapter?</p>",
      {
        type: "code",
        code: "Person[] public people;",
        language: "solidity"
      },
      "<p>Now we'll learn how to add someone to the array:</p>",
      {
        type: "code",
        code: "// create a New Person:\nPerson satoshi = Person(172, \"Satoshi\");\n\n// Add that person to the Array:\npeople.push(satoshi);",
        language: "solidity"
      },
      "<p>We can combine these into a single line of code to keep things clean:</p>",
      {
        type: "code",
        code: "people.push(Person(172, \"Satoshi\"));",
        language: "solidity"
      },
      {
        type: "note",
        content: "<code>array.push()</code> adds something to the end of the array, so elements are in the order we add them. See the following example:"
      },
      {
        type: "code",
        code: "uint[] numbers;\nnumbers.push(5);\nnumbers.push(10);\nnumbers.push(15);\n// numbers is now equal to [5, 10, 15]",
        language: "solidity"
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "Let's make our createZombie function do something!",
          "Fill in the function body so it creates a new Zombie and adds it to the zombies array. The name and dna for the new Zombie should come from the function parameters.",
          "Let's do this in one line of code to keep things clean."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function createZombie(string memory _name, uint _dna) public {\n        // start here\n    }\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function createZombie(string memory _name, uint _dna) public {\n        zombies.push(Zombie(_name, _dna));\n    }\n\n}",
    hint: "Use zombies.push() to add a new Zombie to the array. Create the Zombie using the parameters _name and _dna."
  },
  {
    chapter: 9,
    title: "Private / Public Functions",
    description: "Learn about function visibility in Solidity.",
    content: [
      "<h1>Chapter 9: Private / Public Functions</h1>",
      "<p>In Solidity, functions are <code>public</code> by default. This means anyone (or any other contract) can call your contract's function and execute its code.</p>",
      "<p>Obviously, this isn't always desirable, and can make your contract vulnerable to attacks. Thus it's good practice to mark your functions as <code>private</code> by default, and then only make <code>public</code> the functions you want to expose to the world.</p>",
      "<p>Let's look at how to declare a private function:</p>",
      {
        type: "code",
        code: "uint[] numbers;\n\nfunction _addToArray(uint _number) private {\n  numbers.push(_number);\n}",
        language: "solidity"
      },
      "<p>This means only other functions within our contract will be able to call this function and add to the <code>numbers</code> array.</p>",
      "<p>As you can see, we use the keyword <code>private</code> after the function name. And as with function parameters, it's convention to start private function names with an underscore (<code>_</code>).</p>",
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "Our contract's <code>createZombie</code> function is currently public — this means anyone could call it and create a new Zombie in our contract! Let's make it private.",
          "Modify <code>createZombie</code> to make it a private function. Don't forget the naming convention!"
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function createZombie(string memory _name, uint _dna) public {\n        zombies.push(Zombie(_name, _dna));\n    }\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        zombies.push(Zombie(_name, _dna));\n    }\n\n}",
    hint: "Change the function from 'public' to 'private' and rename it to '_createZombie' following the convention for private functions."
  },
  {
    chapter: 10,
    title: "Return Values & Function Modifiers",
    description: "Learn how functions can return values and how to use modifiers.",
    content: [
      "<h1>Chapter 10: Return Values & Function Modifiers</h1>",
      "<p>In this chapter, we'll learn about function return values and modifiers.</p>",
      "<h2>Return Values</h2>",
      "<p>To return a value from a function, the declaration looks like this:</p>",
      {
        type: "code",
        code: "string greeting = \"What's up dog\";\n\nfunction sayHello() public returns (string memory) {\n  return greeting;\n}",
        language: "solidity"
      },
      "<p>In Solidity, the function declaration contains the type of the return value (in this case <code>string</code>).</p>",
      "<h2>Function modifiers</h2>",
      "<p>The function above doesn't actually change state in Solidity — e.g. it doesn't change any values or write anything to the blockchain.</p>",
      "<p>So in this case we could declare it as a <code>view</code> function, meaning it's only viewing the data but not modifying it:</p>",
      {
        type: "code",
        code: "function sayHello() public view returns (string memory) { ... }",
        language: "solidity"
      },
      "<p>Solidity also contains <code>pure</code> functions, which means you're not even accessing any data in the app. Consider the following:</p>",
      {
        type: "code",
        code: "function _multiply(uint a, uint b) private pure returns (uint) {\n  return a * b;\n}",
        language: "solidity"
      },
      "<p>This function doesn't even read from the state of the app — its return value depends only on its function parameters. So in this case we would declare the function as <code>pure</code>.</p>",
      {
        type: "note",
        content: "It may be hard to remember when to use pure vs view. Fortunately the Solidity compiler is good about issuing warnings to let you know when you should use one of these modifiers."
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "We're going to create a public function that uses the parameter _dna and returns a uint.",
          "The function should be named _generateRandomDna. It should be private and return a uint.",
          "Don't make the function take any parameters, but do make sure to specify it as view since it only reads from our contract's state."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        zombies.push(Zombie(_name, _dna));\n    }\n\n    // start here\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        zombies.push(Zombie(_name, _dna));\n    }\n\n    function _generateRandomDna() private view returns (uint) {\n        \n    }\n\n}",
    hint: "Declare a private view function named _generateRandomDna that returns a uint."
  },
  {
    chapter: 11,
    title: "Events and Web3.js",
    description: "Learn about Solidity events and how they connect to front-end applications.",
    content: [
      "<h1>Chapter 11: Events and Web3.js</h1>",
      "<p>Our contract is almost finished! Now let's add an <code>event</code> to communicate with the frontend.</p>",
      "<h2>Events</h2>",
      "<p><code>Events</code> are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.</p>",
      {
        type: "code",
        code: "// declare the event\nevent IntegersAdded(uint x, uint y, uint result);\n\nfunction add(uint _x, uint _y) public returns (uint) {\n  uint result = _x + _y;\n  // fire an event to let the app know the function was called:\n  emit IntegersAdded(_x, _y, result);\n  return result;\n}",
        language: "solidity"
      },
      "<p>Your app front-end could then listen for the event. A JavaScript implementation would look something like:</p>",
      {
        type: "code",
        code: "YourContract.IntegersAdded(function(error, result) {\n  // This function gets executed when your contract emits the event\n  // Access event data with: result.args.x, result.args.y, and result.args.result\n})",
        language: "javascript"
      },
      "<h2>Web3.js</h2>",
      "<p>The Ethereum network is made up of nodes that share a copy of the same data. When you want your DApp to interact with the blockchain, you need to connect it to one of these nodes.</p>",
      "<p>For this, Ethereum has a JSON-RPC API that exposes methods the app can call. Web3.js is a JavaScript library that wraps around these methods to make them easier to use in your app.</p>",
      {
        type: "code",
        code: "// Connect to an Ethereum node\nconst web3 = new Web3(Web3.givenProvider || \"ws://localhost:8545\");\n\n// Reference to your deployed contract\nconst zombieFactory = new web3.eth.Contract(abi, contractAddress);\n\n// Call a contract function\nzombieFactory.methods.createZombie(\"Zombie #1\", 123).send({ from: userAccount })\n  .then(function(receipt) {\n    // Transaction completed\n    console.log(receipt);\n  });\n\n// Listen for events\nzombieFactory.events.NewZombie()\n  .on(\"data\", function(event) {\n    let zombie = event.returnValues;\n    console.log(\"A new zombie was born!\", zombie);\n  });",
        language: "javascript"
      },
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "Let's add an event to notify the frontend when a new zombie is created.",
          "Define an event called NewZombie. It should pass the zombie's id (a uint), name (a string), and dna (a uint).",
          "Modify the _createZombie function to emit the NewZombie event after adding the new Zombie to the array.",
          "You'll need the zombie's id. array.push() returns a uint representing the length of the new array. Since arrays are 0-indexed, array.push() - 1 is the index of the zombie we just added. Store the result of zombies.push() - 1 in a uint called id, and use that in the NewZombie event."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        zombies.push(Zombie(_name, _dna));\n    }\n\n    function _generateRandomDna(string memory _str) private view returns (uint) {\n        uint rand = uint(keccak256(abi.encodePacked(_str)));\n        return rand % dnaModulus;\n    }\n\n    function createRandomZombie(string memory _name) public {\n        uint randDna = _generateRandomDna(_name);\n        _createZombie(_name, randDna);\n    }\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    event NewZombie(uint zombieId, string name, uint dna);\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        uint id = zombies.push(Zombie(_name, _dna)) - 1;\n        emit NewZombie(id, _name, _dna);\n    }\n\n    function _generateRandomDna(string memory _str) private view returns (uint) {\n        uint rand = uint(keccak256(abi.encodePacked(_str)));\n        return rand % dnaModulus;\n    }\n\n    function createRandomZombie(string memory _name) public {\n        uint randDna = _generateRandomDna(_name);\n        _createZombie(_name, randDna);\n    }\n\n}",
    hint: "First declare the event at the top of your contract, then modify _createZombie to emit that event with the correct parameters."
  },
  {
    chapter: 12,
    title: "Zombie Battle System",
    description: "Build a system for zombies to attack and feed on other lifeforms.",
    content: [
      "<h1>Chapter 12: Zombie Battle System</h1>",
      "<p>Now that we have the basic Zombie Factory, let's add battle functionality!</p>",
      "<p>In this lesson, we're going to build a battle system that allows our zombies to attack other lifeforms and grow stronger by feeding on them.</p>",
      "<h2>Inheritance</h2>",
      "<p>Our game code is getting quite long. Rather than making one extremely long contract, sometimes it makes sense to split your code logic across multiple contracts to organize the code.</p>",
      "<p>One feature of Solidity that makes this more manageable is contract <code>inheritance</code>:</p>",
      {
        type: "code",
        code: "contract ZombieFeeding is ZombieFactory {\n  // Inherits all methods and properties from ZombieFactory\n}",
        language: "solidity"
      },
      "<p>When you use inheritance, each Solidity file can contain multiple contracts, and each contract can inherit from another. The compiler will flatten all the code when compiling.</p>",
      "<h2>Import</h2>",
      "<p>When you have multiple files and you want to import one file into another, Solidity uses the <code>import</code> keyword:</p>",
      {
        type: "code",
        code: "import \"./someothercontract.sol\";\n\ncontract newContract is SomeOtherContract {\n\n}",
        language: "solidity"
      },
      "<p>So when we compile <code>newContract</code>, the compiler knows to look for <code>SomeOtherContract</code> in the file we're importing.</p>",
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "Now that we've set up a multi-file structure, we need to make a new contract to handle the feeding and battle logic.",
          "Create a new contract called ZombieFeeding that inherits from ZombieFactory.",
          "You'll need to import ZombieFactory in this file first."
        ]
      }
    ],
    initialCode: "// Start by importing the ZombieFactory contract\n\ncontract ZombieFeeding {\n  // Define contract here\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\nimport \"./zombiefactory.sol\";\n\ncontract ZombieFeeding is ZombieFactory {\n\n}",
    hint: "Import the zombiefactory.sol file and create a ZombieFeeding contract that inherits from ZombieFactory."
  },
  {
    chapter: 13,
    title: "Mappings and Addresses",
    description: "Learn about mappings, Ethereum addresses, and how to use msg.sender to track ownership.",
    content: [
      "<h1>Chapter 13: Mappings and Addresses</h1>",
      "<p>Let's make our game multi-player by giving the zombies in our database an owner.</p>",
      "<p>To do this, we'll need 2 new data types: <code>mapping</code> and <code>address</code>.</p>",
      
      "<h2>Addresses</h2>",
      "<p>The Ethereum blockchain is made up of <code>accounts</code>, which you can think of like bank accounts.</p>",
      "<p>An account has a balance of <code>Ether</code> (the currency used on the Ethereum blockchain), and you can send and receive Ether payments to other accounts, just like your bank account can wire transfer money to other bank accounts.</p>",
      "<p>Each account has an <code>address</code>, which you can think of like a bank account number. It's a unique identifier that points to that account, and it looks like this:</p>",
      {
        type: "code",
        code: "0x0cE446255506E92DF4161C4661d6df9Cc906183",
        language: "text"
      },
      "<p>(This address belongs to the CryptoZombies team. If you're enjoying CryptoZombies, you can send us some Ether! 😉)</p>",
      "<p>We'll get into the nitty gritty of addresses in a later lesson, but for now you only need to understand that an <code>address</code> is owned by a specific user (or a smart contract).</p>",
      
      "<p>So we can use it as a unique ID for ownership of our zombies. When a user creates new zombies by interacting with our app, we'll set ownership of those zombies to the Ethereum address that called the function.</p>",
      
      "<h2>Mappings</h2>",
      "<p>In Lesson 1 we looked at <code>structs</code> and <code>arrays</code>. <code>Mappings</code> are another way of storing organized data in Solidity.</p>",
      
      "<p>Defining a <code>mapping</code> looks like this:</p>",
      {
        type: "code",
        code: "// For a financial app, storing a uint that holds the user's account balance:\nmapping (address => uint) public accountBalance;\n// Or could be used to store / lookup usernames based on userId\nmapping (uint => string) userIdToName;",
        language: "solidity"
      },
      
      "<p>A mapping is essentially a key-value store for storing and looking up data. In the first example, the key is an <code>address</code> and the value is a <code>uint</code>, and in the second example the key is a <code>uint</code> and the value a <code>string</code>.</p>",
      
      {
        type: "task",
        title: "Put it to the test: Part 1",
        items: [
          "To store zombie ownership, we're going to use two mappings: one that keeps track of the address that owns a zombie, and another that keeps track of how many zombies an owner has.",
          "1. Create a mapping called <code>zombieToOwner</code>. The key will be a <code>uint</code> (we'll store and look up the zombie based on its id) and the value an <code>address</code>. Let's make this mapping <code>public</code>.",
          "2. Create a mapping called <code>ownerZombieCount</code>, where the key is an <code>address</code> and the value a <code>uint</code>."
        ]
      },
      
      "<h2>msg.sender</h2>",
      "<p>Now that we have our mappings to keep track of who owns a zombie, we'll want to update the <code>_createZombie</code> method to use them.</p>",
      "<p>In order to do this, we need to use something called <code>msg.sender</code>.</p>",
      
      "<p>In Solidity, there are certain global variables that are available to all functions. One of these is <code>msg.sender</code>, which refers to the <code>address</code> of the person (or smart contract) who called the current function.</p>",
      
      {
        type: "note",
        content: "In Solidity, function execution always needs to start with an external caller. A contract will just sit on the blockchain doing nothing until someone calls one of its functions. So there will always be a <code>msg.sender</code>."
      },
      
      "<p>Here's an example of using <code>msg.sender</code> and updating a <code>mapping</code>:</p>",
      
      {
        type: "code",
        code: "mapping (address => uint) favoriteNumber;\n\nfunction setMyNumber(uint _myNumber) public {\n  // Update our `favoriteNumber` mapping to store `_myNumber` under `msg.sender`\n  favoriteNumber[msg.sender] = _myNumber;\n  // ^ The syntax for storing data in a mapping is just like with arrays\n}\n\nfunction whatIsMyNumber() public view returns (uint) {\n  // Retrieve the value stored in the sender's address\n  // Will be `0` if the sender hasn't called `setMyNumber` yet\n  return favoriteNumber[msg.sender];\n}",
        language: "solidity"
      },
      
      "<p>In this trivial example, anyone could call <code>setMyNumber</code> and store a <code>uint</code> in our contract, which would be tied to their address. Then when they called <code>whatIsMyNumber</code>, they would be returned the <code>uint</code> that they stored.</p>",
      
      "<p>Using <code>msg.sender</code> gives you the security of the Ethereum blockchain — the only way someone can modify someone else's data would be to steal the private key associated with their Ethereum address.</p>",
      
      {
        type: "task",
        title: "Put it to the test: Part 2",
        items: [
          "Let's update our <code>_createZombie</code> method to assign ownership of the zombie to whoever called the function.",
          "1. First, after we get the new zombie's <code>id</code>, let's update our <code>zombieToOwner</code> mapping to store <code>msg.sender</code> under that <code>id</code>.",
          "2. Second, let's increase <code>ownerZombieCount</code> for this <code>msg.sender</code>.",
          "In Solidity, you can increase a <code>uint</code> with <code>++</code>, just like in JavaScript: <code>ownerZombieCount[msg.sender]++;</code>"
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\nimport \"./zombiefactory.sol\";\n\ncontract ZombieFactory {\n\n    event NewZombie(uint zombieId, string name, uint dna);\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    // Define mappings here\n\n    function _createZombie(string memory _name, uint _dna) private {\n        uint id = zombies.push(Zombie(_name, _dna)) - 1;\n        // Update ownership here\n        emit NewZombie(id, _name, _dna);\n    }\n\n    function _generateRandomDna(string memory _str) private view returns (uint) {\n        uint rand = uint(keccak256(abi.encodePacked(_str)));\n        return rand % dnaModulus;\n    }\n\n    function createRandomZombie(string memory _name) public {\n        uint randDna = _generateRandomDna(_name);\n        _createZombie(_name, randDna);\n    }\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\nimport \"./zombiefactory.sol\";\n\ncontract ZombieFactory {\n\n    event NewZombie(uint zombieId, string name, uint dna);\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    mapping (uint => address) public zombieToOwner;\n    mapping (address => uint) ownerZombieCount;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        uint id = zombies.push(Zombie(_name, _dna)) - 1;\n        zombieToOwner[id] = msg.sender;\n        ownerZombieCount[msg.sender]++;\n        emit NewZombie(id, _name, _dna);\n    }\n\n    function _generateRandomDna(string memory _str) private view returns (uint) {\n        uint rand = uint(keccak256(abi.encodePacked(_str)));\n        return rand % dnaModulus;\n    }\n\n    function createRandomZombie(string memory _name) public {\n        uint randDna = _generateRandomDna(_name);\n        _createZombie(_name, randDna);\n    }\n\n}",
    hint: "First create the two mappings, then update _createZombie to assign ownership to msg.sender and increment the zombie count."
  },
  {
    chapter: 14,
    title: "Msg.sender",
    description: "Learn about the msg.sender global variable and how to track ownership in Solidity.",
    content: [
      "<h1>Chapter 14: Msg.sender</h1>",
      "<p>Now that we have our mappings to keep track of who owns a zombie, we'll want to update the <code>_createZombie</code> method to use them.</p>",
      "<p>In order to do this, we need to use something called <code>msg.sender</code>.</p>",
      
      "<h2>msg.sender</h2>",
      "<p>In Solidity, there are certain global variables that are available to all functions. One of these is <code>msg.sender</code>, which refers to the <code>address</code> of the person (or smart contract) who called the current function.</p>",
      
      {
        type: "note",
        content: "In Solidity, function execution always needs to start with an external caller. A contract will just sit on the blockchain doing nothing until someone calls one of its functions. So there will always be a <code>msg.sender</code>."
      },
      
      "<p>Here's an example of using <code>msg.sender</code> and updating a mapping:</p>",
      
      {
        type: "code",
        code: "mapping (address => uint) favoriteNumber;\n\nfunction setMyNumber(uint _myNumber) public {\n  // Update our `favoriteNumber` mapping to store `_myNumber` under `msg.sender`\n  favoriteNumber[msg.sender] = _myNumber;\n  // ^ The syntax for storing data in a mapping is just like with arrays\n}\n\nfunction whatIsMyNumber() public view returns (uint) {\n  // Retrieve the value stored in the sender's address\n  // Will be `0` if the sender hasn't called `setMyNumber` yet\n  return favoriteNumber[msg.sender];\n}",
        language: "solidity"
      },
      
      "<p>In this trivial example, anyone could call <code>setMyNumber</code> and store a <code>uint</code> in our contract, which would be tied to their address. Then when they called <code>whatIsMyNumber</code>, they would be returned the <code>uint</code> that they stored.</p>",
      
      "<p>Using <code>msg.sender</code> gives you the security of the Ethereum blockchain — the only way someone can modify someone else's data would be to steal the private key associated with their Ethereum address.</p>",
      
      {
        type: "task",
        title: "Put it to the test",
        items: [
          "Let's update our <code>_createZombie</code> method from lesson 1 to assign ownership of the zombie to whoever called the function.",
          "1. First, after we get back the new zombie's <code>id</code>, let's update our <code>zombieToOwner</code> mapping to store <code>msg.sender</code> under that <code>id</code>.",
          "2. Second, let's increase <code>ownerZombieCount</code> for this <code>msg.sender</code>.",
          "In Solidity, you can increase a <code>uint</code> with <code>++</code>, just like in JavaScript: <code>uint number = 0; number++; // `number` is now `1`</code>",
          "Your final answer for this chapter should be 2 lines of code."
        ]
      }
    ],
    initialCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    event NewZombie(uint zombieId, string name, uint dna);\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    mapping (uint => address) public zombieToOwner;\n    mapping (address => uint) ownerZombieCount;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        uint id = zombies.push(Zombie(_name, _dna)) - 1;\n        // Start here\n        emit NewZombie(id, _name, _dna);\n    }\n\n    function _generateRandomDna(string memory _str) private view returns (uint) {\n        uint rand = uint(keccak256(abi.encodePacked(_str)));\n        return rand % dnaModulus;\n    }\n\n    function createRandomZombie(string memory _name) public {\n        uint randDna = _generateRandomDna(_name);\n        _createZombie(_name, randDna);\n    }\n\n}",
    solutionCode: "pragma solidity >=0.5.0 <0.6.0;\n\ncontract ZombieFactory {\n\n    event NewZombie(uint zombieId, string name, uint dna);\n\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\n    struct Zombie {\n        string name;\n        uint dna;\n    }\n\n    Zombie[] public zombies;\n\n    mapping (uint => address) public zombieToOwner;\n    mapping (address => uint) ownerZombieCount;\n\n    function _createZombie(string memory _name, uint _dna) private {\n        uint id = zombies.push(Zombie(_name, _dna)) - 1;\n        zombieToOwner[id] = msg.sender;\n        ownerZombieCount[msg.sender]++;\n        emit NewZombie(id, _name, _dna);\n    }\n\n    function _generateRandomDna(string memory _str) private view returns (uint) {\n        uint rand = uint(keccak256(abi.encodePacked(_str)));\n        return rand % dnaModulus;\n    }\n\n    function createRandomZombie(string memory _name) public {\n        uint randDna = _generateRandomDna(_name);\n        _createZombie(_name, randDna);\n    }\n\n}",
    hint: "After the line that gets the zombie id, add two new lines: one to store msg.sender in the zombieToOwner mapping, and another to increment ownerZombieCount for this msg.sender."
  }
];

export default lessonData; 