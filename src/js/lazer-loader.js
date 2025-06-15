const DEFAULT_CONFIG = {
  rootMargin: '0px',
  threshold: 0,
};

const isAbove = (entry) => entry.boundingClientRect.y < entry.rootBounds.y;

export class LazerLoader {
  constructor(options) {
    this.targets = options.targets;
    this.config = Object.assign({}, DEFAULT_CONFIG, options.config);
    this.cb = options.cb;
  }

  onIntersection = (entries) => {
    // Loop through the entries
    entries.forEach((entry) => {
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        // Stop watching and do stuff
        this.observer.unobserve(entry.target);
        this.handleIntersection(entry);
      }
    });
  };

  handleIntersection = (entry) => {
    this.cb(entry.target, isAbove(entry));
  };

  init = () => {
    this.observer = new IntersectionObserver(this.onIntersection, this.config);
    this.targets.forEach((target) => {
      this.observer.observe(target);
    });
  };
}

export class ImageLazerLoader extends LazerLoader {
  handleIntersection = (entry) => {
    const { target } = entry;
    const nodes = [...target.childNodes];

    nodes.forEach((node) => {
      if (node.nodeName === 'SOURCE') {
        node.setAttribute('srcset', node.dataset.srcset);
        node.removeAttribute('data-srcset');
      }
      if (node.nodeName === 'IMG') {
        node.setAttribute('src', node.dataset.src);
        node.removeAttribute('data-src');
      }
    });

    this.cb(target, isAbove(entry));
  };
}

export class APILazerLoader extends LazerLoader {
  constructor(props) {
    super(props);

    this.loadAPI = props.loadAPI;
    this.queue = [];
    this.api = null;
    this.apiState = 'not loaded';
  }

  handleIntersection = (entry) => {
    const { target } = entry;
    if (this.apiState === 'loaded') {
      this.cb(this.api, target);
    } else if (this.apiState === 'fetching') {
      this.queue.push(target);
    } else if (this.apiState === 'not loaded') {
      this.apiState = 'fetching';
      this.queue.push(target);
      this.loadAPI().then((api) => {
        this.api = api;
        this.apiState = 'loaded';
        this.queue.forEach((target) => {
          this.cb(this.api, target);
        });
        this.queue.length = 0;
      });
    }
  };
}
