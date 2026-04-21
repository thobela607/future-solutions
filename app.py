import os
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'change-this-in-production')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/products')
def products():
    return render_template('products.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()

        if not all([name, email, subject, message]):
            flash('Please fill in all required fields.', 'danger')
            return render_template('contact.html', form_data=request.form)

        try:
            _send_email(name, email, phone, subject, message)
        except Exception as exc:
            print(f"Email send failed: {exc}")

        flash("Thank you! Your message has been received. We'll be in touch shortly.", 'success')
        return redirect(url_for('contact'))

    return render_template('contact.html')


def _send_email(name, email, phone, subject, message):
    smtp_host = os.environ.get('SMTP_HOST', '')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_pass = os.environ.get('SMTP_PASS', '')
    to_email = os.environ.get('CONTACT_EMAIL', '')

    body = (
        f"New contact form submission — Future Solutions\n\n"
        f"Name:    {name}\n"
        f"Email:   {email}\n"
        f"Phone:   {phone or 'Not provided'}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}\n\n"
        f"Received: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    )
    print(body)

    if not all([smtp_host, smtp_user, smtp_pass, to_email]):
        return

    msg = MIMEText(body)
    msg['Subject'] = f"[Future Solutions] {subject}"
    msg['From'] = smtp_user
    msg['To'] = to_email

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
