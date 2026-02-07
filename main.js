const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



function Modal(option = {}) {
  const { 
    templateId, 
    destroyOnClose = true, 
    footer = false,
    cssClass = [], 
    closeMethod = ['button', 'overlay', 'escape'],
    onOpen,
    onClose 
    } = option;    
    const template = $(`#${templateId}`);

    if(!template) {
      console.error(`Template "#${templateId}" does not exist!`);
      return;
    }

    this._allowBackdropClose = closeMethod.includes('overlay');
    this._allowButtonClose = closeMethod.includes('button');
    this._allowEscapeClose = closeMethod.includes('escape');


  function getScrollbarWidth() {
    if(getScrollbarWidth.value) {
      return getScrollbarWidth.value;
    }    

    const div = document.createElement('div');
    Object.assign(div.style, {
      overflowY: 'scroll',
      position: 'absolute',
      top: '-9999px',
    }); 

    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    getScrollbarWidth.value = scrollbarWidth;
    return scrollbarWidth;
  };

  this._build = () => {
    const content = template.content.cloneNode(true);

    // Create modal elements
    this._backdrop = document.createElement('div');
    this._backdrop.className = 'modal-backdrop';

    const container = document.createElement('div');
    container.className = 'modal-container';

    cssClass.forEach(className => {
      if(typeof className === 'string') {
        container.classList.add(className);
      }
    })

    if(this._allowButtonClose) {
      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.innerHTML = '&times;';

      container.append(closeButton);

      // Attach event listener to close button
      closeButton.addEventListener('click', () => {
        this.close();
      });
    };
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Append content and elements
    modalContent.append(content);
    container.append(modalContent);

    if (footer) {
      this._modalFooter = document.createElement('div');
      this._modalFooter.className = 'modal-footer';

      if(this._footerContent) {
        this._modalFooter.innerHTML = this._footerContent;
      }

      container.append(this._modalFooter);
    }

    this._backdrop.append(container);
    document.body.append(this._backdrop);
  };

  this.setFooterContent = (html) => {
    this._footerContent = html;

    if(this._modalFooter) {
      this._modalFooter.innerHTML = html;
    }
  };

  this.open = () => {
    if(!this._backdrop) {
      this._build();
    }
  
    setTimeout(() => {
      this._backdrop.classList.add("show");
    }, 0);

    // Disable page scroll when modal is open
    document.body.classList.add('no-scroll');
    document.body.style.paddingRight = getScrollbarWidth() + "px";

   
    if(this._allowBackdropClose) {
      this._backdrop.onclick = (event) => {
        if(event.target === this._backdrop) {
          this.close();
        }
     };
    }

    if(this._allowEscapeClose) {
      document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
          this.close();
        }
      });
    };

    this.ontransitionend(() => {
      if(typeof onOpen === "function") onOpen();
    });
    
    return this._backdrop;
  };

  this.ontransitionend = (callback) => {
    this._backdrop.ontransitionend = (event) => {
      if(event.propertyName !== "transform") return;

      if(typeof callback === 'function') callback();
    }
  }

  this.close = (destroy = destroyOnClose) => {
    if(!this._backdrop) return; // Guard: tránh lỗi khi backdrop đã null
    
    this._backdrop.classList.remove("show");

   
      this.ontransitionend(() => {
        if(this._backdrop && destroy) {
          this._backdrop.remove();
          this._backdrop = null;
          this._modalFooter = null;
        }

        // Enable scrolling
        document.body.classList.remove("no-scroll");
        document.body.style.paddingRight = "";

        if(typeof onClose === "function") onClose();
      });
    
  };

  this.destroy = () => {
    this.close(true);
  };

};

// modal12.open();
// modal12.close();
// modal12.setFooterContent("HTML string");
// modal12.addFooterButton("Cancle", "class-1 class-2", (e) => {} );
// mdal12.addFooterButton("Agree", "class-3 class-4", (e) => {});
// modal12.destroy()


const modal1 = new Modal({
    templateId: "modal-1",
    destroyOnClose: false,
     onOpen: () => {
        console.log("Modal 1 opened");
    },
    onClose: () => {
        console.log("Modal 1 closed");
    },

});

$("#open-modal-1").onclick = () => {
    const modalElement = modal1.open();

    // const img = modalElement.querySelector("img");
    // console.log(img);
};

const modal2 = new Modal({
    templateId: "modal-2",
    destroyOnClose: true,
    cssClass: ["class1", "class2", "classN"],
    onOpen: () => {
        console.log("Modal 2 opened");
    },
    onClose: () => {
        console.log("Modal 2 closed");
    },
});

$("#open-modal-2").onclick = () => {
    const modalElement = modal2.open();

    const form = modalElement.querySelector("#login-form");
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = {
                email: $("#email").value.trim(),
                password: $("#password").value.trim(),
            };

            // console.log(formData);
        };
    }
};

const modal3 = new Modal({
    templateId: "modal-3",
    destroyOnClose: true,
    footer: true,
    onOpen: () => {
        console.log("Modal 3 opened");
    },
    onClose: () => {
        console.log("Modal 3 closed");
    },
});

modal3.setFooterContent("<h2>Footer content</h2>")

modal3.open();