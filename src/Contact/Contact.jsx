
import './contact.css'
import { useState } from 'react';


const Contact = () => {

    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
        formData.append("access_key", "6316c65e-bf6d-4686-800a-063217b89dac");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setResult("Form Submitted Successfully");
                event.target.reset();
            } else {
                console.error("Web3Forms rejected it:", data);
                setResult(data.message || "Something went wrong — try again?");
            }
        } catch (error) {
            console.error(error);
            setResult("Couldn't reach the server. Check your connect.");
        }
    };

    return (
        <div id='contact' className='section-div'>
            <h2 className='section-titles'>Contact</h2>
            <div id='contact-div'>
                <div id='get-in-touch'>
                    <h2>Let's Talk!</h2>
                    <p>Have a question? Want to work together? Send a message!</p>
                </div>
                <form className='send-email' onSubmit={onSubmit}>

                    <label htmlFor='name'>Name</label>
                    <input id='name' type="text" name="name" required />

                    <label htmlFor='email'>Email</label>
                    <input id='email' type="email" name="email" required />

                    <label htmlFor='message'>Message</label>
                    <textarea id='message' name="message" required></textarea>

                    <button type="submit">Submit Form</button>
                    <span>{result}</span>

                    <input type='hidden' name='subject' value='New message from portfolio' />
                </form>
            </div>
        </div>
    )
};

export default Contact;