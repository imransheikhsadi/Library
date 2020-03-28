class Gallary {
  constructor(nav,vanish,gallaryItem) {
    window.onload = ()=>{
      this.images = [];
      this.handleImages(gallaryItem,nav,vanish);
      this.handleClick(nav,vanish);
    }
  }

  //handle Images Initially
  handleImages(gallaryItem,nav,vanish){
    const allItems = this.collectAllItems(gallaryItem);
    let arrayKey;
    nav.forEach((item, i) => {
       arrayKey = item;
      const vanishItems = this.collectVanishedItems(allItems,vanish[i]);
      const appearItems = this.appearItems(allItems,vanishItems);
      const affectedItems = this.affectedItems(allItems,vanishItems);
      const sortItems = this.sortItems(allItems,affectedItems,vanishItems);
      const navItem = {
          navName: item,
          allItems: allItems,
          vanishItems: vanishItems,
          affectedItems: affectedItems,
          sortItems: sortItems,
          appearItems: appearItems
      }

      this.images[arrayKey] = navItem;
    });
  }

  //Collect All Gallary Items
  collectAllItems(gallaryItem){
    const allItems = []
    const items = gallaryItem ? this.select(gallaryItem):[...document.querySelector('.gallary').children];
    items.forEach((item,i)=>{
      item.setAttribute("positionindex",`${i}`)
      allItems.push({
        item: item,
        x:item.x,
        y:item.y,
        position: i
      })
    });
    return allItems;
  }

  //Collect All Vanished allItems
  collectVanishedItems(allItems,vanish){
    const viewItems = []
    this.select(vanish).forEach((item, i) => {
      viewItems.push({
        item: item,
        x:item.x,
        y:item.y,
        position: Number(item.getAttribute('positionindex'))
      })
    });

    const vanishItems = allItems.filter((item,i)=>{
      for (var i = 0; i < viewItems.length; i++) {
        if (viewItems[i].position === item.position) return false;
      }
      return true;
    })
    return vanishItems;
  }
  //appearItems
  appearItems(allItems,vanishItems){
    const appearItems = allItems.filter((item,i)=> {
      for (var i = 0; i < vanishItems.length; i++) {
        if (vanishItems[i].position === item.position) return false;
      }
      return true;
    })
    return appearItems;
  }

  //Affected Items
  affectedItems(allItems,vanishItems){
    if (vanishItems.length > 0) {
      const lowest = this.lowestItem(vanishItems);

      const affectedItems = allItems.filter(item=> {
        for (var i = 0; i < vanishItems.length; i++) {
          if (vanishItems[i].position === item.position || item.position <= lowest ) return false;
        }
        return true;
      })

      return affectedItems;
    }else {
      return allItems;
    }
  }

  sortItems(allItems,affectedItems,vanishItems){
    if (vanishItems.length > 0) {
      const lowest = this.lowestItem(vanishItems);
      const initialItems = allItems.filter((item)=> item.position >= lowest);
      const sortItems = [];
      affectedItems.forEach((item, i) => {
        sortItems.push(initialItems[i]);
      });

      return sortItems;
    }else {
      return allItems;
    }
  }

  lowestItem(vanishItems){
    // console.log(vanishItems);
    
    return vanishItems.reduce((low,cur)=>{
      return low.position < cur.position ? low : cur;
    }).position;
  }

//sort by position
  sort(places,items){
    places.forEach((place, i) => {
      items[i].item.style.transform = `translateX(${place.x - items[i].item.x}px) translateY(${place.y - items[i].item.y}px)`;
    });
  }

  //Vanish Items
  handleVanish(items){
    items.forEach((item, i) => {
      item.item.style.opacity = '0';
      item.item.style.transform = 'scale(.5)';
    });
  }

  //handleAppear
  handleAppear(items){
    items.forEach((item, i) => {
      item.item.style.opacity = '1';
      item.item.style.transform = 'scale(1)';
    });
  }

  //Handle Click
  handleClick(nav,vanish){
    nav.forEach((navItem, i) => {
      this.select(navItem).forEach((item, i) => {
        item.addEventListener('click',()=>{
          const imageItem = this.images[navItem];
          this.handleAppear(imageItem.appearItems);
          this.handleVanish(imageItem.vanishItems);
          this.sort(imageItem.sortItems,imageItem.affectedItems);
        })
      });
    });
  }

  //select
  select(item){
    return document.querySelectorAll(item)
  }

}

export default Gallary;
