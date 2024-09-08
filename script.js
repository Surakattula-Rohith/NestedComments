function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString(); // Formats the current date and time
  }
  
  function createInputBox() {
    const elem = document.createElement("div");
    elem.classList.add("comment-reply-container");
    elem.innerHTML = `
      <input type="text" placeholder="Write your reply" class="input" />
      <button class="btn">Submit</button>
    `;
    return elem;
  }
  
  function createReplyCard(text) {
    const elem = document.createElement("div");
    const timestamp = getCurrentTimestamp();
    elem.classList.add("comment");
    elem.innerHTML = `
      <div class="card">
        <div class="comment-header">
          <div class="timestamp">${timestamp}</div>
          <div class="text">${text}</div>
        </div>
        <div class="action-buttons">
          <div class="reply">Reply</div>
          <div class="edit">Edit</div>
          <div class="delete">Delete</div>
        </div>
      </div>
    `;
    return elem;
  }
  
  const commentContainer = document.querySelector(".comment-container");
  
  commentContainer.addEventListener("click", (e) => {
    const closestComment = e.target.closest(".comment");
  
    // Add Reply feature
    if (e.target.classList.contains("reply")) {
      if (!closestComment.querySelector(".comment-reply-container")) {
        const inputBox = createInputBox();
        closestComment.appendChild(inputBox);
        const inputElem = inputBox.querySelector(".input");
        inputElem.focus(); // Auto-focus on the input box
      }
    }
  
    // Submit Reply button or Enter key
    if (e.target.classList.contains("btn")) {
      const inputElem = closestComment.querySelector(".input");
      if (inputElem && inputElem.value.trim()) {
        closestComment.appendChild(createReplyCard(inputElem.value.trim()));
        inputElem.parentNode.remove(); // Remove the input box after submission
      }
    }
  
    // Edit feature
    if (e.target.classList.contains("edit")) {
      const textElem = closestComment.querySelector(".text");
      const oldText = textElem.textContent;
      textElem.innerHTML = `
        <input type="text" value="${oldText}" class="input edit-input" />
        <button class="btn update-btn">Update</button>
      `;
    }
  
    // Delete feature
    if (e.target.classList.contains("delete")) {
      closestComment.remove(); // Remove the comment element from the DOM
    }
  });
  
  // Listen for 'Enter' key or 'Update' button to submit a reply or update a comment
  commentContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("input")) {
      const inputElem = e.target;
      const closestComment = inputElem.closest(".comment");
  
      if (inputElem.classList.contains("edit-input")) {
        const newText = inputElem.value.trim();
        if (newText) {
          const textElem = closestComment.querySelector(".text");
          textElem.textContent = newText; // Update the text with the new input value
        }
      } else if (inputElem.value.trim()) {
        closestComment.appendChild(createReplyCard(inputElem.value.trim()));
      }
      inputElem.parentNode.remove(); // Remove the input box after submission or update
    }
  });
  
  commentContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("update-btn")) {
      const inputElem = e.target.previousElementSibling;
      const closestComment = e.target.closest(".comment");
      const newText = inputElem.value.trim();
  
      if (newText) {
        const textElem = closestComment.querySelector(".text");
        textElem.textContent = newText; // Update the text with the new input value
      }
      inputElem.parentNode.remove(); // Remove the input box after update
    }
  });
  