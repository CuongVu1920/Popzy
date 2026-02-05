const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



function Modal(option = {}) {
  const { 
    templateId, 
    destroyOnClose = true, 
    cssClass = [], 
    closeMethod = ['button', 'overlay', 'escape'] 
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
  }

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
    this._backdrop.append(container);
    document.body.append(this._backdrop);
  }

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
    }
    
    return this._backdrop;
  };

  this.close = (destroy = destroyOnClose) => {
    this._backdrop.classList.remove("show");
    this._backdrop.ontransitionend = () => {
      if(this._backdrop && destroy) {
        this._backdrop.remove();
        this._backdrop = null;
      }

      // Enable scrolling
      document.body.classList.remove("no-scroll");
      document.body.style.paddingRight = "";
    };
  };

  this.destroy = () => {
    this.close(true);
  }

}

// modal12.open();
// modal12.close();
// modal12.setFooterContent("HTML string");
// modal12.addFooterButton("Cancle", "class-1 class-2", (e) => {} );
// mdal12.addFooterButton("Agree", "class-3 class-4", (e) => {});
// modal12.destroy()


const modal1 = new Modal({
    templateId: "modal-1",
    destroyOnClose: false,
    // cssClass: ["class1", "class2", "classN"],
});

$("#open-modal-1").onclick = () => {
    const modalElement = modal1.open();

    const img = modalElement.querySelector("img");
    console.log(img);
};

const modal2 = new Modal({
    templateId: "modal-2",
    // closeMethods: ['button', 'overlay', 'escape'],
    destroyOnClose: true,
    footer: true,
    cssClass: ["class1", "class2", "classN"],
    onOpen: () => {
        console.log("Modal opened");
    },
    onClose: () => {
        console.log("Modal closed");
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

            console.log(formData);
        };
    }
};
