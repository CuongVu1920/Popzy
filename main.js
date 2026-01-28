const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



function Modal() {
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

    // Disable page scroll when modal is open
    document.body.classList.add('no-scroll');

    return backdrop;
  };

  this.closeModal = (modalElement) => {
    modalElement.classList.remove("show");
    modalElement.addEventListener('transitionend', () => {
      modalElement.remove();

      // Enable page scroll when modal is closed
      document.body.classList.remove('no-scroll');
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



