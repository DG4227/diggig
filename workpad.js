class Test {
  constructor(object, object2) {
    this.name = object.name
    this.breed = object.breed
    this.age = object2.age
    this.size = object2.size
  }

  namePrint(){
    alert(`YOUR NAME IS ${this.name}`)
  }

}

obj = {name: "deezer", breed: "shepard"}
obj2 = {age: "10", size: "large"}
