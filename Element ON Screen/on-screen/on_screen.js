import ID from './assets/randomID';

class OnScreen {
  constructor(items) {
    this.store = []
    this.items = this.addID(items);    
    this.init();
  }
  init = () => {
    window.addEventListener('scroll', this.debounce(this.handleScroll))
  }

  debounce = (handleScroll) => {
    let frame;
    return (event) => {
      if (frame) {
        cancelAnimationFrame(frame)
      }
      frame = requestAnimationFrame(() => {
        handleScroll(event)
      })
    }
  }

  handleScroll = (event) => {
    const items = this.items
    items.forEach((item, i) => {
      document.querySelectorAll(item.element).forEach((element, i) => {
        const visible = this.checkPosition(element);
        this.handleDuplicate(item, element, visible)
      })
    })
  }

  addID(items) {
    items.forEach(item => {
      document.querySelectorAll(item.element).forEach(item => {
        if (item.id === '') {
          item.setAttribute('id', ID.newID())
        }
      })
    })
    return items;
  }

  handleDuplicate(item, element, visible) {
    if (this.store[element.id] === undefined && visible) {
      this.store[element.id] = visible;
      item.callback.in(element)
    } else if (this.store[element.id] && !visible) {
      this.store[element.id] = visible;
      item.callback.out(element)
    } else if (!this.store[element.id] && visible) {
      this.store[element.id] = visible;
      if (item.repeat === undefined || item.repeat) {
        item.callback.in(element)
      }
    }
  }

  checkPosition(element) {
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
