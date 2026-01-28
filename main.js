const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



function Modal() {
  function getScrollbarWidth() {
    if(getScrollbarWidth.value) {
      console.log("trả về giá trị đã lưu");
      

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
    console.log("Tính toán kích thước thanh cuộn", scrollbarWidth);
    

    return scrollbarWidth;
  }


  this.openModal = (option = {}) => {
    const { templateId, allowBackdropClose = true } = option;    
    const template = $(`#${templateId}`);

    if(!template) {
      console.error(`${template} does not exist!`);
      return;
    }

    const content = template.content.cloneNode(true);


    // Create modal elements
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';

    const container = document.createElement('div');
    container.className = 'modal-container';

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '&times;';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Append content and elements
    modalContent.append(content);
    container.append(closeButton, modalContent);
    backdrop.append(container);
    document.body.append(backdrop);


    setTimeout(() => {
      backdrop.classList.add("show");
    }, 0);

    // Disable page scroll when modal is open
    document.body.classList.add('no-scroll');
    document.body.style.paddingRight = getScrollbarWidth() + "px";

    // Attach event listener to close button
    closeButton.addEventListener('click', () => {
      this.closeModal(backdrop);
    });

    if(allowBackdropClose) {
      backdrop.onclick = (event) => {
        if(event.target === backdrop) {
          this.closeModal(backdrop);
        }
     };
    }

    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape') {
        this.closeModal(backdrop);
      }
    });

    return backdrop;
  };

  this.closeModal = (modalElement) => {
    modalElement.classList.remove("show");
    modalElement.addEventListener('transitionend', () => {
      modalElement.remove();

      // Enable page scroll when modal is closed
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = "";
    });
  }

}


const modal = new Modal();
// modal.openModal('<p>This is a dynamically created modal!</p>');

$("#open-modal-1").onclick = () => {
  const modalElement = modal.openModal({
    templateId: "modal-1",
  });
  console.log(modalElement);
}


$("#open-modal-2").onclick = () => {
  const modalElement = modal.openModal({
    templateId: "modal-2",
    allowBackdropClose: false,
  });

  const form = modalElement.querySelector("form");
    if(form) { 
      form.onsubmit = (event) => {
        event.preventDefault();

        const email = form.querySelector("#email").value.trim();
        const password = form.querySelector("#password").value.trim();
        
        const formData = {
          email:email,
          password: password
        };

        console.log(formData);
        
      }
    }
};
// 1. Xử lý được sự kiện submit form, lấy được các giá trị của input khi submit
// 2. Thêm tùy chọn bật/tắt cho phép click vào overlay để đóng modal
// 3. Không cho phép cuộn trang khi modal hiển thị


// console.log(box.clientWidth); // độ rộng không bao gồm cuộn
// console.log(box.offsetWidth); // độ rộng bao gồm cuộn

