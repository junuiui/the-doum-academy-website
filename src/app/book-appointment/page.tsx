import styles from "./page.module.css"


export default function BookAppointmentPage() {
    return (
        <form className={styles.container}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    // value={formData.name}
                    // onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    // value={formData.email}
                    // onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}