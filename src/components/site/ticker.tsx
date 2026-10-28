import { Fragment } from "react";
import { tickerItems } from "@/lib/site-data";

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track" data-marquee data-duration="38">
        <div className="ticker__group">
          {tickerItems.map((item, index) => (
            <Fragment key={`${item}-${index}`}>
              <span>{item}</span>
              <i>✳</i>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
