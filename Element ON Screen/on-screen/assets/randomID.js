const ID = {
  allID: [],
  newID: (length=4)=>{
    let id = ID.totalNumber(length);
    if (ID.check(id)) {
      return id;
    }
    return ID.newID(length)   
  },
  check: (totalNumber)=>{
    let allID = ID.allID;
    if (allID.length > 0) {
      let existedID = allID.filter(id=> id === totalNumber);
      if (existedID.length > 0) {
        return false;
      }
      allID.push(totalNumber)
      return true;
    }else{
      allID.push(totalNumber)
      return true;
    }
  },
  randomNumber: ()=>{
    return parseInt(Math.random()*10).toString()
  },
  totalNumber: (length)=>{
    let totalNumber = '';
    for (let index = 0; index < length; index++) {
      totalNumber += ID.randomNumber()
    }
    if (totalNumber[0] === '0') {
      totalNumber = totalNumber.replace('0','1')
    }
    return totalNumber;
  }
}

export default ID;

