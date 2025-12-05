import styles from './page.module.css'

/**
 * Todo:
 *  1. Need to ask what sections are needed
 *  2. 
 * 
 */

export default function ContactUsPage() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Contact Us</h1>

            <form className={styles.form_container}>
                {/* Name */}
                <div>
                    <label htmlFor="name">이름:</label>
                    <input type="text" id="name" name="name" required />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input type="email" id="email" name="email" required />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone">전화번호:</label>
                    <input type="tel" id="phone" name="phone" />
                </div>

                {/* Student Grade */}
                <div>
                    <label htmlFor="grade">Student Grade:</label>
                    <select id="grade" name="grade">
                        <option value="" disabled>Select</option>
                        <option value="Elementary">Elementary</option>
                        <option value="Middle School">Middle School</option>
                        <option value="High School">High School</option>
                    </select>
                </div>

                {/* Inquiry Type */}
                <div>
                    <label htmlFor="topic">Reason for Inquiry:</label>
                    <select id="topic" name="topic" required>
                        <option value="">Select</option>
                        <option value="Tutoring">Tutoring</option>
                        <option value="Registration">Registration</option>
                        <option value="Billing">Billing</option>
                        <option value="General">General</option>
                    </select>
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                    ></textarea>
                </div>

                <button type="submit">Submit</button>
            </form>
        </main>
    )
}
