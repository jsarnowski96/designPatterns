#!/usr/bin/env node

// Wzorce projektowe z implementacją w języku JavaScript (ES6)
// Wywołanie skryptu: node .

// Wzorce konstrukcyjne
// SINGLETON PATTERN

class SingletonObject {
    #_privateVar1;
    #_privateVar2;

    constructor(param) {
        if(SingletonObject.exists) {
            return SingletonObject.instance;
        }

        this.#_privateVar1 = "private variable 1";
        this.#_privateVar2 = "private variable 2";
        this.param = param;

        SingletonObject.exists = true;
        SingletonObject.instance = this;
        return this;
    }

    getPrivateVar1() {
        return this.#_privateVar1;
    }

    getPrivateVar2() {
        return this.#_privateVar2;
    }
}

const singletonObject1 = new SingletonObject(17);
const singletonObject2 = new SingletonObject(33);

console.log("SINGLETON PATTERN\n------------\n");

console.log(singletonObject1);
console.log(singletonObject2);
console.log("Comparison of two SingletonObject constants:", singletonObject1 === singletonObject2, "\n");

console.log("Accessing private var 1 via direct reference: " + singletonObject1._privateVar1);
console.log("Accessing private var 2 via direct reference: " + singletonObject1._privateVar2 + "\n");
console.log("Accessing private var 1 via dedicated public method: " + singletonObject2.getPrivateVar1());
console.log("Accessing private var 2 via dedicated public method: " + singletonObject2.getPrivateVar2() + "\n");

// BUILDER PATTERN

class Foundation {
    constructor(param1, param2, param3) {
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
    }
}

class Builder {
    constructor(param1, param2, param3) {
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
        console.log(this);
    }

    setParam1(param) {
        this.param1 = param;
        return this;
    }

    setParam2(param) {
        this.param2 = param;
        return this;
    }

    setParam3(param) {
        this.param3 = param;
        return this;
    }

    build() {
        return new Foundation(this.param1, this.param2, this.param3);
    }
}

console.log("BUILDER PATTERN\n------------\n");
const foundation = new Builder(1,2,3).setParam1(4).setParam2(5).setParam3(6).build();
console.log(foundation, "\n");

// FACTORY PATTERN

class BaseShape {
    constructor() {
        if(this.constructor == BaseShape) {
            throw new Error("Creating an instance of an abstract class is not allowed.");
        }
    }

    squareArea() {
        return;
    }

    squareEdgeSum() {
        return;
    }

    rectArea() {
        return;
    }

    rectEdgeSum() {
        return;
    }

    diameter() {
        return;
    }
}

class Square extends BaseShape {
    #_edge;

    constructor(edge) {
        super();
        this.#_edge = edge;
    }

    getEdge() {
        return this.#_edge;
    }

    squareArea() {
        return this.#_edge * this.#_edge;
    }

    squareEdgeSum() {
        return this.#_edge * 4;
    }
}

class Rectangle extends BaseShape {
    #_edge1;
    #_edge2;

    constructor(edge1, edge2) {
        super();
        this.#_edge1 = edge1;
        this.#_edge2 = edge2;
    }

    getEdge1() {
        return this.#_edge1;
    }

    getEdge2() {
        return this.#_edge2;
    }

    rectArea() {
        return this.#_edge1 * this.#_edge2;
    }

    rectEdgeSum() {
        return this.#_edge1 * 2 + this.#_edge2 * 2;
    }
}

class Circle extends BaseShape {
    #_diameter;
    #_circumference;

    constructor(diameter, circumference) {
        super();
        this.#_diameter = diameter;
        this.#_circumference = circumference;
    }

    getDiameter() {
        return this.#_diameter;
    }

    getCircumference() {
        return this.#_circumference;
    }

    field() {
        return (Math.pow((this.#_diameter / 2), 2) * Math.PI).toFixed(2);
    }
}

console.log("FACTORY PATTERN\n------------\n");

const square = new Square(4);
console.log("SQUARE:");
console.log("Edge:", square.getEdge());
console.log("Area:", square.squareArea());
console.log("Edge sum:", square.squareEdgeSum(), "\n");

const rectangle = new Rectangle(2, 6);
console.log("RECTANGLE:");
console.log("Edge 1:", rectangle.getEdge1(), "\tEdge 2:", rectangle.getEdge2());
console.log("Area:", rectangle.rectArea());
console.log("Edge sum:", rectangle.rectEdgeSum(), "\n");

const circle = new Circle(43, 151);
console.log("CIRCLE:");
console.log("Diameter:", circle.getDiameter());
console.log("Circumference:", circle.getCircumference());
console.log("Field:", circle.field(), "\n");

// ABSTRACT FACTORY PATTERN

class Abstract {
    #_param1;

    constructor(param1) {
        this.#_param1 = param1;
    }

    getParam1() {
        return this.#_param1;
    }
}

class AbstractFactory {
    createAbstract(param1) {
        return new Abstract(param1);
    }
}

console.log("ABSTRACT FACTORY PATTERN\n------------\n");

const abstract = new AbstractFactory().createAbstract("245522");
console.log(abstract);
console.log("Abstract param1 value:", abstract.getParam1(), "\n");

// PROTOTYPE PATTERN

class Source {}
Source.prototype.update = function(target, value) {
    target.publicParam1 = value;
}

class Target {
    constructor(param1) {
        this.publicParam1 = param1;
    }
}

console.log("PROTOTYPE PATTERN\n------------\n");

const source = new Source();
const target = new Target("INITIAL TARGET VALUE");

console.log(target);

source.update(target, "CHANGED");

console.log(target, "\n");

// FACADE PATTERN

class Candidate {
    #_name;
    constructor(name) {
        this.#_name = name;
    }

    getName() {
        return this.#_name;
    }
}

Candidate.prototype.applyFor = function(college, spec, result) {
    if(result == "APPROVED") {
        return new Student(this.getName(), spec);
    } else if(result == "DENIED") {
        return "Better luck next time.";
    }
}

class Student {
    name;
    spec;
    constructor(name, spec) {
        this.name = name;
        this.spec = spec;
    }    

    getStudent() {
        return this;
    }
}

class College {
    #_name;
    constructor(name) {
        this.#_name = name;
    }

    getName() {
        return this.#_name;
    }
}

class Studies {
    #_spec;
    constructor(spec) {
        this.#_spec = spec;
    }

    getSpec() {
        return this.#_spec;
    }
}

console.log("FACADE PATTERN\n------------\n");

const college = new College("University of Gdańsk");
const studies = new Studies("Aplikacje Informatyczne w Biznesie");

const candidate1 = new Candidate("Jan K.");
const candidate2 = new Candidate("Adam S.");

const res1 = candidate1.applyFor(college.getName(), studies.getSpec(), "DENIED");
const res2 = candidate2.applyFor(college.getName(), studies.getSpec(), "APPROVED");

console.log("STUDENT 1:", res1);
console.log("STUDENT 2:", res2, "\n");

// ADAPTER PATTERN

function obsoleteCalc() {
    this.calc = function(value1, value2) {
        return Math.pow(value1, value2);
    }
}

class CalcObject {
    value1; value2; value3;

    constructor() {
        this.calc = function() {
            return Math.pow(this.value1, this.value2 * this.value3);
        }
    }
}


class CalcAdapter {
    constructor(value3) {
        this.calcObj = new CalcObject();
        this.calcObj.value3 = value3;
        return {
            newCalc: (value1, value2) => {
                this.calcObj.value1 = value1;
                this.calcObj.value2 = value2;
                return this.calcObj.calc();
            }
        }
    }
}

console.log("ADAPTER PATTERN\n------------\n");

const obs = new obsoleteCalc();
console.log("OBSOLETE CALC VERSION:", obs.calc(3,4));

const adapter = new CalcAdapter(2);
console.log("UPDATED CALC VIA ADAPTER:", adapter.newCalc(3,4), "\n");

// FLYWEIGHT PATTERN

class Element {
    constructor(param1, param2, param3) {
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
    }
};
 
class ElementFactory {
    elements = {};
};

var elementFactory = new ElementFactory();

ElementFactory.prototype.get = function(param1, param2, param3) {
    if(elementFactory.elements[param1 + param2]) {
        elementFactory.elements[param1 + param2] = new Element(param1, param2, param3);
    }
}

ElementFactory.prototype.getCount = function() {
    var count = 0;
    for(var e in elementFactory.elements) count++;
    return count;
}
 
class ItemCollection {
    items = {};
    count = 0;

    constructor(param1, param2, param3, param4, param5) {
        this.add = function() {
            this.items[param1] = new Item(param1, param2, param3, param4, param5);
            this.count++;
        }
    
        this.get = function(param5) {
            return this.items[param5];
        }
    
        this.getCount = function() {
            return this.count;
        }
    }
}
 
class Item {
    constructor(param1, param2, param3, param4, param5) {
        this.element = elementFactory.get(param1, param2, param3);
        this.param4 = param4;
        this.param5 = param5;
        this.getParam1 = function() {
            return this.element.param1;
        }

    }
}

var items = new ItemCollection();
    
console.log("FLYWEIGHT PATTERN\n------------\n");

items.add(1, 2, 3, 3, 2);
items.add(1, 2, 3, 4, 1);
items.add(1, 2, 3, 2, 3);
items.add(1, 2, 3, 7, 7);
items.add(21, 22, 23, 21, 24);
items.add(21, 22, 23, 22, 28);
items.add(21, 22, 23, 23, 21);
 
console.log("Items count:", items.getCount());
console.log("Elements count:", elementFactory.getCount(), "\n");

// BRIDGE PATTERN

class Input1 {
    constructor(out) {
        this.out = out;
    }

    func1() {
        this.out.func1();
    }

    func2() {
        this.out.func2();
    }

    func3() {
        this.out.func3();
    }

    func4() {
        this.out.func4();
    }
}

class Input2 {
    constructor(out) {
        this.out = out;
    }

    func1() {
        this.out.func1();
    }

    func2() {
        this.out.func2();
    }

    func3() {
        this.out.func3();
    }

    func4() {
        this.out.func4();
    }
}

class Output1 {
    func1() {
        console.log("Output1 func1 called");
    }

    func2() {
        console.log("Output1 func2 called");
    }

    func3() {
        console.log("Output1 func3 called");
    }

    func4() {
        console.log("Output1 func4 called");
    }
}

class Output2 {
    func1() {
        console.log("Output2 func1 called");
    }

    func2() {
        console.log("Output2 func2 called");
    }

    func3() {
        console.log("Output2 func3 called");
    }

    func4() {
        console.log("Output2 func4 called");
    }
}

console.log("BRIDGE PATTERN\n------------\n");

const output1 = new Output1();
const output2 = new Output2();
const input1 = new Input1(output1);
const input2 = new Input2(output2);

console.log("Input1 class:");
input1.func1();
input1.func2();
input1.func3();
input1.func4();
console.log();

console.log("Input2 class:");
input2.func1();
input2.func2();
input2.func3();
input2.func4();
console.log();

// PROXY PATTERN

class Equator {
    getData(data) {
        if(data === 1) {
            return Math.E;
        } else if(data === 2) {
            return Math.LN2;
        } else if(data === 3) {
            return Math.LN10;
        } else if(data === 4) {
            return Math.LOG2E;
        } else if(data === 5) {
            return Math.LOG10E;
        } else {
            return null;
        }
    }
}

class Proxy {
    equator = new Equator();
    storage = {};

    getData(data) {
        if(!this.storage[data]) {
            this.storage[data] = this.equator.getData(data);
        }
        return this.storage[data];
    }

    getCount() {
        var count = 0;
        for(var s in this.storage) count++;
        return count;
    }
}

const proxy = new Proxy();

console.log("PROXY PATTERN\n------------\n");

console.log(proxy.getData(1));
console.log(proxy.getData(2));
console.log(proxy.getData(3));
console.log(proxy.getData(4));
console.log(proxy.getData(5));
console.log(proxy.getData(1));
console.log(proxy.getData(2));
console.log(proxy.getData(3));
console.log(proxy.getData(4));
console.log(proxy.getData(5));

console.log("Storage size:", proxy.getCount(), "\n");

// COMPOSITE PATTERN

class Node {
    children = [];

    constructor(name) {
        this.name = name;
    }
}

Node.prototype.add = function(child) {
    this.children.push(child);
};

Node.prototype.remove = function(child) {
    var length = this.children.length;
    for(var i = 0; i < length; i++) {
        if(this.children[i] === child) {
            this.children.splice(i, 1);
            return;
        }
    }
};

Node.prototype.getChildAt = function(index) {
    return this.children[index];
};

Node.prototype.hasAnyChildren = function() {
    return this.children.length > 0;
};

function traverse(node) {
    for(var i = 0; i < node.children.length; i++) {
        console.log(node.name, node.getChildAt(i), "\n");
        traverse(node.getChildAt(i));
    }
}

const root = new Node("root");
const l0 = new Node("left level 0");
const r0 = new Node("right level 0");
const l1 = new Node("left level 1");
const r1 = new Node("right level 1");
const l2 = new Node("left level 2");
const r2 = new Node("right level 2");
const l3 = new Node("left level 3");
const r3 = new Node("right level 3");

console.log("COMPOSITE PATTERN\n------------\n");

root.add(l0);
root.add(r0);
root.remove(r0);
root.add(r0);

l0.add(l1);
l0.add(r1);

r0.add(l2);
r0.add(r2);

l1.add(l3);
l1.add(r3);

traverse(root);