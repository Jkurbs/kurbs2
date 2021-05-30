import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { slide as Menu } from "react-burger-menu";
import play from "./assets/play-48.png";

import search from "./assets/search2x.png";
import collection from "./assets/collections2x.png";
import conversation from "./assets/conversation2x.png";
import { useMediaQuery } from "react-responsive";
import Film from "./components/VideoPlayer";
import checkmark from "./assets/checkmark-64.png";
import testimonial from "./assets/testimonial.jpeg";

import About from "./About";
import { World } from "./components/World";
import { images, movingGraphics, movingGraphicsMobile } from "./App.data";

const cacheImages = async (srcArray) => {
  const promises = await srcArray.map((src) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });
  await Promise.all(promises);
};

var text_one_value;
var text_two_value;
var text_three_value;

function App() {
  const isMobile = useMediaQuery({ maxWidth: 1224 });
  return (
    <div className="wrapper">
      <header className="header">
        <div className="menu-container">
          <a
            className={isMobile ? "logo-text-mobile" : "logo-text"}
            href="/home"
          >
            Kurbs
          </a>
          {isMobile ? (
            <Menu right>
              <a href="/about" id="about" className="menu-item">
                About
              </a>
              <a
                id="contact"
                className="menu-item"
                href="mailto:youremail@domain.tld"
              >
                Contact
              </a>
            </Menu>
          ) : (
            <div className="menu-container">
              <a className="menu-item" href="/about">
                About
              </a>
              <a className="menu-item" href="mailto:youremail@domain.tld">
                Contact Us
              </a>
            </div>
          )}
        </div>
      </header>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/home" />;
            }}
          />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/film" component={Film} />
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 1224 });

  useEffect(() => {
    cacheImages(images);
    var text_one = $("#text_one");
    var text_two = $("#text_two");
    var text_three = $("#text_three");

    text_one_value = text_one.offset().top - 200;
    text_two_value = text_two.offset().top - 200;
    text_three_value = text_three.offset().top - 200;
  }, []);

  const [displayImage, setDisplayImage] = useState(search);

  $(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height < text_one_value) {
      setDisplayImage(search);
    } else if (height < text_two_value) {
      setDisplayImage(collection);
    } else if (height < text_three_value) {
      setDisplayImage(conversation);
    }
  });

  return (
    <div className="App">
      <div id={isMobile ? "headline-mobile" : "headline"}>
        <div id={isMobile ? "headline-container-mobile" : "headline-container"}>
          <div class="section-header">
            <h1 id={isMobile ? "headline-title-mobile" : "headline-title"}>
              Insights from <br />
              the world’s greatest <br></br>
            </h1>
            <div
              class={
                isMobile
                  ? "rw-words-mobile rw-words-1-mobile "
                  : "rw-words rw-words-1"
              }
            >
              <span>Thinkers</span>
              <span>Answers</span>
              <span>Scriptures</span>
              <span>Tweets</span>
              <span>Expertise</span>
            </div>
          </div>

          {/* Moving Graphics */}

          {isMobile ? (
            <div className="moving-graphics-container">
              {movingGraphicsMobile.map((graphic) => {
                return (
                  <img
                    className="moving-graphics-image-mobile"
                    style={{
                      left: graphic.left,
                      top: graphic.top,
                    }}
                    src={graphic.img}
                  />
                );
              })}
            </div>
          ) : (
            <div className="moving-graphics-container">
              {movingGraphics.map((graphic) => {
                return (
                  <img
                    className="moving-graphics-image"
                    style={{
                      left: graphic.left,
                      top: graphic.top,
                    }}
                    src={graphic.img}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div
          className={
            isMobile
              ? "call-to-action-container-mobile"
              : "call-to-action-container"
          }
        >
          <div
            className={
              isMobile ? "call-to-action-left-mobile" : "call-to-action-left"
            }
          >
            <a id="play-text" href="/film">
              Watch the film
            </a>
            <a href="/film">
              <img id="play-button" src={play} alt="Watch the video" />
            </a>
          </div>
          <div
            className={
              isMobile ? "call-to-action-right-mobile" : "call-to-action-right"
            }
          >
            <button
              className="request-button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href =
                  "https://s4lnqpx6qg2.typeform.com/to/tPRmF6u3";
              }}
            >
              <a
                id={
                  isMobile
                    ? "call-to-action-right_text-mobile"
                    : "call-to-action-right_text"
                }
              >
                Request Access
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Details */}

      {isMobile ? (
        <div style={{ paddingTop: isMobile ? 20 : 80 }}>
          <div
            style={{
              zIndex: 1,
              height: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "100%" : "40%",
              float: isMobile ? null : "left",
            }}
          >
            <img
              className={isMobile ? "display-phone-mobile" : "display-phone"}
              src={displayImage}
            />
            <img
              style={{ visibility: "hidden" }}
              id="sticky-phantom"
              className="display-phone-mobile"
              src={displayImage}
            />
          </div>

          {/* How it works */}
          <div
            className={
              isMobile
                ? "display-description-container-mobile"
                : "display-description-container"
            }
          >
            <h1 id={isMobile ? "headline-title-mobile" : "headline-title"}>
              How it works
            </h1>
            <div className="description-container">
              <img
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  flexGrow: 1,
                }}
                src={checkmark}
              />

              <p
                id="text_one"
                className={
                  isMobile
                    ? "display-description-mobile"
                    : "display-description"
                }
              >
                Ask a question.
              </p>
            </div>
            <div className="description-container">
              <img
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  flexGrow: 1,
                }}
                src={checkmark}
              />

              <p
                id="text_one"
                className={
                  isMobile
                    ? "display-description-mobile"
                    : "display-description"
                }
              >
                Let's face it. The internet is humongous, but there are times
                when you just don't feel like hunting and searching through the
                web to find what you're looking for. Kurbs does all of the work
                for you, by automatically taking your search question and
                searching the entire internet for relevant results, then sorting
                them into Books (knowledge), Scriptures (quotes), Tweets (latest
                news), Audio (podcasts), and Videos (tutorials).
              </p>
            </div>
            <div className="description-container">
              <img
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  flexGrow: 1,
                }}
                src={checkmark}
              />

              <p
                id="text_two"
                className={
                  isMobile
                    ? "display-description-mobile"
                    : "display-description"
                }
              >
                Never waste time searching through myriad of irrelevant
                material. Kurbs organizes content from the web, so you spend
                less time looking for it and more time digesting it.
              </p>
            </div>
            <div className="description-container">
              <img
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  flexGrow: 1,
                }}
                src={checkmark}
              />

              <p
                id="text_two"
                className={
                  isMobile
                    ? "display-description-mobile"
                    : "display-description"
                }
              >
                As an added bonus, this app also allows to take notes and
                discuss results with others. So simple, yet so insanely useful.
              </p>
            </div>

            <div className="description-container">
              <img
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  flexGrow: 1,
                }}
                src={checkmark}
              />

              <p
                id="text_three"
                className={
                  isMobile
                    ? "display-description-mobile"
                    : "display-description"
                }
              >
                You’ll save hours of research into any topic and find smarter,
                more insightful discussions in the same time.
              </p>
            </div>
            {/* Use it to */}
            <div>
              <h1 id={isMobile ? "headline-title-mobile" : "headline-title"}>
                Use it to
              </h1>
              <div
                style={{
                  backgroundColor: "white",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 16,
                  // display: "inline-block",
                }}
              >
                {" "}
                <h3 style={{ color: "#6e6e73" }}>Study</h3>
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    color: "#6e6e73",
                  }}
                >
                  {" "}
                  <li style={{ marginBottom: 16 }}>
                    - Students who use Kurbs will potentially be able to focus
                    better upon a specific topic, write more papers, study for
                    longer and have less stress on tests.
                  </li>
                  <li style={{ marginBottom: 16 }}>
                    - Use it when researching subjects yielding increased
                    efficiency.
                  </li>
                  <li style={{ marginBottom: 16 }}>
                    - Students can now research with the speed of search engines
                    and the quality of a librarian.
                  </li>
                  <li style={{ marginBottom: 16 }}>
                    - Search for related information for any topic without
                    having to make the trip to an actual library.
                  </li>
                </ul>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                {" "}
                <h3 style={{ color: "#6e6e73" }}>Seek advice</h3>
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    color: "#6e6e73",
                  }}
                >
                  <li style={{ marginBottom: 16 }}>
                    - Entrepreneurs can now learn faster, plus Kurbs will keep
                    on learning and personalizing itself to your needs..
                  </li>
                  <li style={{ marginBottom: 16 }}>
                    - You will spend less time reading or finding the best
                    resources and more time applying advice in your business.
                    Kurbs learns from your questions, then improves its results
                    over time.
                  </li>
                  <li style={{ marginBottom: 16 }}>
                    - Kurbs is especially valuable to a novice who is starting
                    their entrepreneurial journey.
                  </li>
                </ul>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                {" "}
                <h3 style={{ color: "#6e6e73" }}>
                  Find knowledge,
                  <br />
                  for the sake of it
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    color: "#6e6e73",
                  }}
                >
                  <li>
                    - You will have a convenient, simple, fast and cost saving
                    way to find knowledge.
                  </li>
                </ul>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 16,
                  display: "inline-block",
                }}
              >
                {" "}
                <h4>
                  "Kurbs is a powerful tool that has made me more efficient
                  during my studies. It's helped me to stay up-to-date with the
                  latest resources and discussions. We can filter our searches
                  to ensure that we are only receiving results that we want and
                  are relevant to our field of interest. Kurbs also allows us to
                  take notes and share these search results with others in our
                  field of study, helping them to stay up-to-date too."
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <img
                    style={{
                      marginRight: 8,
                      borderRadius: 20,
                      width: 40,
                      height: 40,
                    }}
                    src={testimonial}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <a style={{ fontWeight: "bold" }}>Francis Castagna</a>
                    <a>Student</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: isMobile ? 20 : 80 }}>
          <div
            style={{
              zIndex: 1,
              height: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "100%" : "40%",
              float: isMobile ? null : "left",
            }}
          >
            <img
              className={isMobile ? "display-phone-mobile" : "display-phone"}
              src={displayImage}
            />
            <img
              style={{ visibility: "hidden" }}
              id="sticky-phantom"
              className="display-phone-mobile"
              src={displayImage}
            />
          </div>
          <div
            className={
              isMobile
                ? "display-description-container-mobile"
                : "display-description-container"
            }
          >
            <p
              id="text_one"
              className={
                isMobile ? "display-description-mobile" : "display-description"
              }
            >
              When you ask a question, Kurbs will classify the question then go{" "}
              <br />
              through relevant Books, <br /> Scriptures, Audio files, and Videos{" "}
              <br /> to return the best possible answer <br /> at great speed.
              Saving you hours <br /> of Google search.
            </p>
            <p
              id="text_two"
              className={
                isMobile ? "display-description-mobile" : "display-description"
              }
            >
              Organize your searches any way you like. With collections, every
              one of the answers you find is right where you want it. Create
              your collections and get to them easily at any time.
            </p>
            <p
              id="text_three"
              className={
                isMobile ? "display-description-mobile" : "display-description"
              }
            >
              Take details notes.
            </p>
            <p
              className={
                isMobile ? "display-description-mobile" : "display-description"
              }
            >
              Expand your mind and explore new ideas by discussing answers with
              like-minded individuals. If you want to keep everything private
              there's an option for that.
            </p>
            <p
              className={
                isMobile ? "display-description-mobile" : "display-description"
              }
            >
              The app brings an infinite amount of results to a finite valuable
              set of results and ressources. Saving you time and money.
            </p>
          </div>
        </div>
      )}

      <div className={isMobile ? "founder-mobile" : "founder"}>
        <h2 id="founder-title">
          The world’s most important <br /> knowledge, organized.
        </h2>
        <a id={isMobile ? "founder-message-mobile" : "founder-message"}>
          Kurbs mission is to help bring relevant knowledge to the forefront.
          Helping you find knowledge faster so that you can continue doing what
          you love.
        </a>
        <br />
        <small style={{ marginTop: 16 }}>
          <b>Kerby Jean</b>
          <br /> Founder
        </small>
        <div id="founder-button">
          <button
            className="request-button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href =
                "https://s4lnqpx6qg2.typeform.com/to/tPRmF6u3";
            }}
          >
            <a
              id={
                isMobile
                  ? "call-to-action-right_text-mobile"
                  : "call-to-action-right_text"
              }
            >
              Request Access
            </a>
          </button>
        </div>
        <div id={isMobile ? "world-mobile" : "world"}>
          <World />
        </div>
      </div>
      <div className="footer">
        <h2>Kurbs</h2>
        <a>
          The world’s most important <br /> knowledge, organized.
        </a>
        <div className="footer-navigation">
          <a href="/about">About</a>
          <a href="mailto:youremail@domain.tld">Contact Us</a>
          <a
            href={
              "https://www.notion.so/Terms-of-Service-7cc381ae6af14a129c0b7699cafcd157"
            }
          >
            Terms of use
          </a>
          <a
            href={
              "https://www.notion.so/Privacy-Policy-9829a3cea20945799e82becb39449bf2"
            }
          >
            Privacy Policy
          </a>
        </div>
        <span>© 2021 Kurbs</span>
      </div>
    </div>
  );
}

export default App;
