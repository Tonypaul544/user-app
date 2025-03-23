

import './Form.css'
export default function Form() {
  return(
    <div>
      <form action="submit" id="addUserForm">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required placeholder='Enter your name' />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder='Enter your email' />
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required placeholder='Enter phone number' />
        
        <button type="submit" id="submitUserBtn">Submit</button>
      </form>
    </div>
  );
}