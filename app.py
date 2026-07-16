import os

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html", active_page="home")


# ---------- Menus ----------
@app.route("/menu/lunch")
def menu_lunch():
    return render_template("menu_lunch.html", active_page="menus")


@app.route("/menu/dinner")
def menu_dinner():
    return render_template("menu_dinner.html", active_page="menus")


@app.route("/menu/brunch")
def menu_brunch():
    return render_template("menu_brunch.html", active_page="menus")


@app.route("/menu/beverage")
def menu_beverage():
    return render_template("menu_beverage.html", active_page="menus")


@app.route("/menu/kids")
def menu_kids():
    return render_template("menu_kids.html", active_page="menus")


# ---------- About ----------
@app.route("/about")
def about():
    return render_template("about.html", active_page="about")


@app.route("/about/team")
def team():
    return render_template("team.html", active_page="about")


@app.route("/about/press")
def press():
    return render_template("press.html", active_page="about")


@app.route("/about/partners")
def partners():
    return render_template("partners.html", active_page="about")


@app.route("/about/grills")
def grills():
    return render_template("grills.html", active_page="about")


# ---------- Other pages ----------
@app.route("/functions")
def functions_page():
    return render_template("functions.html", active_page="functions")


@app.route("/find-us")
def find_us():
    return render_template("find_us.html", active_page="find_us")


@app.route("/gift-cards")
def gift_cards():
    return render_template("gift_cards.html", active_page="gift_cards")


@app.route("/contact")
def contact():
    return render_template("contact.html", active_page="contact")


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))
