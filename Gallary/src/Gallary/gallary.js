class Gallary {
  constructor(nav,vanish) {
    window.onload = ()=>{
      this.images = [];
      this.handleImages(nav,vanish);
      this.handleClick(nav,vanish);
    }
  }

  //handle Images Initially
  handleImages(nav,vanish){
    const allItems = this.collectAllItems();
    let arrayKey;
    nav.forEach((item, i) => {
       arrayKey = item;
      const vanishItems = this.collectVanishedItems(vanish[i]);
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
  collectAllItems(){
    const allItems = []
    this.select('.gallary_item').forEach((item, i) => {
      allItems.push({
        item: item,
        id: Number(item.id),
        x:item.x,
        y:item.y
      })
    });

    return allItems;
  }

  //Collect All Vanished allItems
  collectVanishedItems(vanish){
    const vanishItems = []
    this.select(vanish).forEach((item, i) => {
      vanishItems.push({
        item: item,
        id: Number(item.id),
        x:item.x,
        y:item.y
      })
    });
    return vanishItems;
  }
  //appearItems
  appearItems(allItems,vanishItems){
    const appearItems = allItems.filter((item,i)=> {
      for (var i = 0; i < vanishItems.length; i++) {
        if (vanishItems[i].id === item.id) return false;
      }
      return true;
    })
    return appearItems;
  }

  //Affected Items
  affectedItems(allItems,vanishItems){
    const lowest = vanishItems.reduce((low,cur)=>{
      return low.id < cur.id ? low : cur;
    }).id;

    const affectedItems = allItems.filter(item=> {
      for (var i = 0; i < vanishItems.length; i++) {
        if (vanishItems[i].id === item.id || item.id <= lowest ) return false;
      }
      return true;
    })

    return affectedItems;
  }

  sortItems(allItems,affectedItems,vanishItems){
    const lowest = vanishItems.reduce((low,cur)=>{
      return low.id < cur.id ? low : cur;
    }).id;
    const initialItems = allItems.filter((item)=> item.id >= lowest);
    const sortItems = [];
    affectedItems.forEach((item, i) => {
      sortItems.push(initialItems[i]);
    });

    return sortItems;
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
