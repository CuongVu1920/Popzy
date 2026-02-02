const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



function Modal(option = {}) {
  const { templateId, closeMethod = ['button', 'overlay', 'escape'] } = option;    
    const template = $(`#${templateId}`);

    if(!template) {
      console.error(`${template} does not exist!`);
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


  this.open = () => {
    const content = template.content.cloneNode(true);

    // Create modal elements
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';

    const container = document.createElement('div');
    container.className = 'modal-container';

    if(this._allowButtonClose) {
      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.innerHTML = '&times;';

      container.append(closeButton);

      // Attach event listener to close button
      closeButton.addEventListener('click', () => {
        this.close(backdrop);
      });
    };
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Append content and elements
    modalContent.append(content);
    container.append(modalContent);
    backdrop.append(container);
    document.body.append(backdrop);


    setTimeout(() => {
      backdrop.classList.add("show");
    }, 0);

    // Disable page scroll when modal is open
    document.body.classList.add('no-scroll');
    document.body.style.paddingRight = getScrollbarWidth() + "px";

   
    if(this._allowBackdropClose) {
      backdrop.onclick = (event) => {
        if(event.target === backdrop) {
          this.close(backdrop);
        }
     };
    }

    if(this._allowEscapeClose) {
      document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
          this.close(backdrop);
        }
      });
    }
    
    return backdrop;
  };

  this.close = (modalElement) => {
    modalElement.classList.remove("show");
    modalElement.addEventListener('transitionend', () => {
      modalElement.remove();

      // Enable page scroll when modal is closed
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = "";
    });
  }

}


// const modal = new Modal({
//   templateId: "modal-1",
//   footer: true,
//   cssClass: ["class1", "class2", "classN"],
//   onOpen: () => {
//     console.log("Modal opend");
//   },
//   onClose: () => {
//     console.log("Modal closed");
//   }
// });

// modal12.open();
// modal12.close();
// modal12.setFooterContent("HTML string");
// modal12.addFooterButton("Cancle", "class-1 class-2", (e) => {} );
// mdal12.addFooterButton("Agree", "class-3 class-4", (e) => {});
// modal12.destroy()


const myModal = new Modal({
  templateId: "modal-1",
  closeMethod: ['button', 'overlay', 'escape']
});

$("#open-modal-1").onclick = () => {
  const backdrop = myModal.open();  // Lưu lại backdrop
  
  // Nếu muốn đóng bằng code sau đó:
  // myModal.close(backdrop);
};


const myModal2 = new Modal({
  templateId: "modal-2",
  closeMethod: ['button', 'overlay', 'escape']
});

$("#open-modal-2").onclick = () => {
  const backdrop = myModal2.open();  // Lưu lại backdrop
  
  // Nếu muốn đóng bằng code sau đó:
  // myModal.close(backdrop);
};

