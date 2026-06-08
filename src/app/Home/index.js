import React, { PureComponent, Fragment } from "react";
import Swiper from "swiper";
import ForecastHourly from "../../components/ForecastHourly";
import ForecastDaily from "../../components/ForecastDaily";
import Location from "../../components/Location";
import Temperature from "../../components/Temperature";
import Navigation from "../../components/Navigation";
import GPSLocation from "../../components/GPSLocation";
import Info from "../../components/Info";
import DateCurrent from "../../components/DateCurrent";
import Refresh from "../../components/Refresh";
import PropTypes from "prop-types";

const SunIcon = ({ className, size = 16 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

SunIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

const MoonIcon = ({ className, size = 16 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21 12.6A8.5 8.5 0 0 1 11.4 3a6.9 6.9 0 1 0 9.6 9.6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

MoonIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};


class Home extends PureComponent {
  constructor() {
    super();

    this.state = {
      currentForecast: "hourly",
      forecastIndex: ["hourly", "daily"],
    };
  }

  componentDidMount() {
    this.forecasts = [...document.querySelectorAll(".forecasts__period")];

    this.swiper = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: false,
    });

    this.swiper.on("slideChangeTransitionEnd", () => {
      this.setState({
        currentForecast: this.state.forecastIndex[this.swiper.activeIndex],
      });
    });
  }

  render() {
    return (
      <Fragment>
        <GPSLocation onGPSLocationClick={this.props.onGPSLocationClick} />
        <Info
          onInfoClick={this.props.onInfoClick}
          onInfoClose={this.props.onInfoClose}
        />
        <button
          className={`theme-toggle ${this.props.darkMode ? "theme-toggle--dark" : ""}`}
          onClick={this.props.onThemeToggle}
          aria-label={
            this.props.darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          type="button"
        >
          <SunIcon className="theme-toggle__icon" size={16} />
          <span className="theme-toggle__thumb" />
          <MoonIcon className="theme-toggle__icon" size={16} />

        </button>
        <Location location={this.props.currentCondition.location} />
        <DateCurrent date={this.props.currentCondition.date} />
        <Temperature
          weather={this.props.currentCondition.weather}
          temperature={this.props.currentCondition.temperature}
        />
        <Refresh
          onClick={this.props.onRefreshClick}
          updating={this.props.updating}
          time={this.props.lastUpdate}
        />
        <section className="forecasts">
          <div className="forecasts__scroll-panel swiper-container">
            <div className="swiper-wrapper">
              <ForecastHourly foreCastHourly={this.props.foreCastHourly} />
              <ForecastDaily foreCastDaily={this.props.foreCastDaily} />
            </div>
          </div>
          <Navigation currentForecast={this.state.currentForecast} />
        </section>
      </Fragment>
    );
  }
}

Home.propTypes = {
  foreCastHourly: PropTypes.array,
  foreCastDaily: PropTypes.array,
  updating: PropTypes.bool,
  lastUpdate: PropTypes.string,
  currentCondition: PropTypes.object,
  onGPSLocationClick: PropTypes.func,
  onInfoClick: PropTypes.func,
  onInfoClose: PropTypes.func,
  onRefreshClick: PropTypes.func,
  onThemeToggle: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default Home;
