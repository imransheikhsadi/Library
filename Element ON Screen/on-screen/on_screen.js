class OnScreen {
  constructor(items) {
    this.store = []
    this.init(items)
  }
  init = (items)=>{
    window.addEventListener('scroll',()=>{
      items.forEach((item,i)=>{
        document.querySelectorAll(item.element).forEach((element,i)=>{
          const visible = this.checkPosition(element);
            this.handleDuplicate(item,element,visible)
        })
      })
    })

  }

  handleDuplicate(item,element,visible){
    if (this.store[element.id] === undefined && visible) {
        this.store[element.id] = visible;
        item.callback.in(element)
    }else if (this.store[element.id] && !visible){
      this.store[element.id] = visible;
      item.callback.out(element)
    }else if(!this.store[element.id] && visible){
      this.store[element.id] = visible;
      if (item.repeat === undefined || item.repeat) {
        console.log(item);
        item.callback.in(element)
      }
    }
  }

  checkPosition(element){
     const rect = element.getBoundingClientRect();
     const html = document.documentElement;

     return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    )
   }
}

export default OnScreen;
