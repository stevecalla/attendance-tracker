import Accordion from "react-bootstrap/Accordion";
import Headerbar from "../homeAttendance/Navbar";
import Footer from "../homeAttendance/Footer";
import { Container } from "react-bootstrap";

function TermsPrivacy() {
  let url =
    process.env.NODE_ENV === "development"
      ? `${process.env.REACT_APP_DEVELOPMENT_URL}`
      : `${process.env.REACT_APP_PRODUCTION_URL}`;

  return (
    <>
      <Headerbar />
      <div style={{ height: "80vh" }}>
        <Accordion
          className="container"
          style={{
            marginTop: "100px",
            // scrollMarginTop: "200px",
          }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Privacy Policy</Accordion.Header>
            <Accordion.Body>
              <p>Privacy Policy</p>
              <main className="container text-start">
                <p>
                  This Privacy Policy applies to the{" "}
                  <a href={url}>The Attendance Tracker</a> website
                  (“&lt;em&gt;Site&lt;/em&gt;”) and the public instance of the
                  The Attendance Tracker Service made available by us, as
                  described on the Site (“&lt;em&gt;Service&lt;/em&gt;”). This
                  Site and the Service are referred to together as “
                  <a href={url}>
                    <em>The Attendance Tracker</em>
                  </a>
                  ”.
                </p>
                <p>
                  We collect and use personal information in different ways for
                  the Site and the Service. This Privacy Policy sets out details
                  of these different ways in which we collect and use
                  information.
                </p>
                <h2>
                  <strong>The Service:</strong> What information do we collect
                  from the Service?
                </h2>
                <p>
                  The Service is a hosted instance of software known as The
                  Attendance Tracker Service. The Attendance Tracker Service
                  provides snippets of code, called “polyfills”, that allows
                  websites operated by FT and by others to provide a consistent
                  experience across different browsers. When you load a web page
                  which uses The Attendance Tracker Service, your browser will
                  download any polyfills required in order to present the web
                  page successfully in your browser.
                </p>
                <p>
                  In order to provide the polyfills, the Service receives
                  certain technical information from your browser including:
                </p>
                <ul>
                  <li>browser details;</li>
                  <li>
                    connection details, such as your IP address, which can
                    identify your approximate location and/or name of your ISP;
                  </li>
                  <li>
                    the URL of the web page which has made the request to the
                    Service.{" "}
                  </li>
                </ul>
                <p>
                  We use the above information to determine which polyfills are
                  required by your browser. We do not retain this information.
                </p>
                <p>We may retain the following information:</p>
                <ul>
                  <li>
                    obfuscated IP addresses, this is an IP address with the last
                    3 digits removed or masked in order to anonymise it;
                  </li>
                  <li>
                    the domain of the web page which has made the request to the
                    Service;
                  </li>
                  <li>the user agent string for your browser;</li>
                  <li>
                    the set of polyfills that were requested by the web page;
                  </li>
                  <li>the URL and HTTP method used to access the service.</li>
                </ul>
                <p>
                  The information we retain cannot identify you. We retain it in
                  order to identify which websites are using the Service and
                  whether any websites are abusing the Service.
                </p>
                <h2>
                  <strong>The Site:</strong> What information do we collect from
                  the users of this Site?
                </h2>
                <p>
                  The information we collect about you if you are browsing this
                  Site may include the following details relating to your visit
                  to the Site:
                </p>
                <ul>
                  <li>browser details;</li>
                  <li>time and date of access;</li>
                  <li>usage statistics, for example frequency;</li>
                  <li>
                    connection details, for example which version of http was
                    used and how long the connection took complete;
                  </li>
                </ul>
                <p>
                  The information we retain cannot identify you. We collect the
                  above information about users of the Site for the following
                  reasons:
                </p>
                <ul>
                  <li>to help monitor and improve the Site;</li>
                  <li>to help strategic development;</li>
                  <li>
                    to monitor compliance with the The Attendance Tracker Terms
                    and Conditions; and
                  </li>
                  <li>
                    to audit usage of the Site and demonstrate usage to third
                    parties.
                  </li>
                </ul>
                <h2>Lawful basis for processing</h2>
                <p>
                  We only process personal information where we have a lawful
                  basis for doing so. We rely on legitimate business interests
                  to process data relating to The Attendance Tracker, for
                  example to monitor compliance with the The Attendance Tracker
                  Terms and Conditions. We take due care to balance our
                  interests against your right to privacy.
                </p>
                <h2>Who we share your information with</h2>
                <p>
                  We may share your information with organisations that provide
                  services on our behalf, such as those that host the Site or
                  the Service, solely for the purposes of their providing those
                  services to us.
                </p>
                <p>
                  We may also disclose your information to comply with
                  applicable laws, court orders or other valid legal processes,
                  and to enforce or apply the{" "}
                  <a href={url}>The Attendance Tracker Terms and Conditions</a>{" "}
                  or any of our other rights.
                </p>
                <h2>
                  How long we retain data relating to The Attendance Tracker
                </h2>
                <p>
                  We do not retain personal data relating to the The Attendance
                  Tracker service. The data that we do retain has been
                  obfuscated or aggregated, for example, IP addresses have the
                  last 3 digits masked once we have determined which polyfills
                  are required by your browser. We retain this non-personal
                  information for 30 days.
                </p>
                <h2>How we keep your information secure</h2>
                <p>
                  We have appropriate technical and administrative security
                  measures in place to help ensure that individuals’ information
                  is protected against unauthorised or accidental access, use,
                  alteration, or loss.
                </p>
                <p>
                  Your personal information may be processed and stored outside
                  the European Economic Area (EEA).
                </p>
                <h2>Your rights</h2>
                <p>
                  We do not retain personal data relating to the The Attendance
                  Tracker service.
                </p>
                <p>
                  If you have any questions about the personal data processed as
                  a result of your use of this service, please contact{" "}
                  <a href="mailto:callasteven@gmail.com">admin@polyfill.io</a>.
                </p>
                <p>
                  You have the right to lodge a complaint with a supervisory
                  authority. In the UK, this is the Information Commissioner’s
                  Office (ICO).
                </p>
                <h2>Where this Privacy Policy applies</h2>
                <p>
                  The Attendance Tracker is not intended for children under 16
                  years of age. We do not intentionally collect or use any
                  information from children.
                </p>
                <p>
                  The Attendance Tracker contains links to third party websites
                  which are not subject to this privacy policy. Websites which
                  use the polyfills are not subject to this privacy policy. We
                  are not responsible for third party websites’ content, use of
                  personal information, or security practices.
                </p>
                <p>
                  If you have a query in regards to the processing of your
                  personal information, please contact our Data Protection
                  Officer directly at{" "}
                  <a href="callasteven@gmail.com">admin@polyfill.io</a>.
                </p>
                <h2>Changes to this privacy policy</h2>
                <p>
                  This policy was reviewed on 26/06/2023 and last updated on
                  11/12/2023.
                </p>
                <p>
                  Any changes we may make to this privacy policy will be posted
                  on this page. If changes are significant, we may choose to
                  indicate clearly on the{" "}
                  <a href={url}>The Attendance Tracker</a> home page that the
                  policy has been updated.
                </p>
              </main>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Terms & Conditions</Accordion.Header>
            <Accordion.Body>
              <p>Terms & Conditions</p>
              <main className="container text-start">
                {/* <h2>Who we are and how to contact us</h2> */}
                <p>
                  <a href={url} target="_self" rel="nofollow noopener">
                    The Attendance Tracker
                  </a>{" "}
                  is operated as a community service by the The Attendance
                  Tracker maintainers (“we”, “us”).
                </p>
                <h2>By using The Attendance Tracker you agree to our terms</h2>
                <p>
                  These terms apply to “The Attendance Tracker”, which means:
                </p>
                <ul>
                  <li>the The Attendance Tracker website (“Site”); and/or</li>
                  <li>
                    the public instance of the The Attendance Tracker Service
                    made available by us, as described on the Site.
                  </li>
                </ul>
                <p>
                  By using The Attendance Tracker you confirm that you accept
                  these terms of use and that you agree to comply with them. If
                  you do not agree to these terms, you must not use The
                  Attendance Tracker.
                </p>
                <p>
                  We recommend that you print or save a copy of these terms for
                  future reference.{" "}
                  <em>
                    Please note that these terms contain provisions which limit
                    or exclude our liability to you, in particular as set out in
                    the section headed “Our responsibility for loss or damage
                    suffered by you”.
                  </em>
                </p>
                <h2>There are other terms that may apply to you</h2>
                <p>
                  These terms of use refer to the following additional terms,
                  which also apply to your use of The Attendance Tracker:
                </p>
                <ul>
                  <li>
                    The <a href={url}>The Attendance Tracker privacy policy</a>,
                    which sets out the terms on which we process any personal
                    data we collect from you or as a result of your use of The
                    Attendance Tracker (including our logging of use of The
                    Attendance Tracker). If you do not agree to the terms of
                    that privacy policy then you must not use The Attendance
                    Tracker, and you should consider hosting the{" "}
                    <a
                      href="https://github.com/stevecalla/attendance-tracker"
                      target="_self"
                      rel="nofollow noopener"
                    >
                      The Attendance Tracker Service code
                    </a>{" "}
                    yourself.
                  </li>
                </ul>
                <h2>
                  The Attendance Tracker are provided as-is and without any SLA
                </h2>
                <p>The Attendance Tracker is made available free of charge.</p>
                <p>
                  We do not guarantee that The Attendance Tracker, or any
                  content on them, will always be available or be uninterrupted.
                  We may suspend or withdraw or restrict the availability of all
                  or any part of The Attendance Tracker for business and
                  operational reasons.
                </p>
                <p>
                  We do not provide any service level agreement or any other
                  performance commitments for The Attendance Tracker. We are not
                  able to participate in any technical due diligence or other
                  procurement process that your organisation may have.
                </p>
                <p>
                  If you require an SLA or guaranteed levels of resilience for
                  The Attendance Tracker, then you are free to obtain your own
                  copy of the The Attendance Tracker Service code from our{" "}
                  <a
                    href="https://github.com/stevecalla/attendance-tracker"
                    target="_self"
                    rel="nofollow noopener"
                  >
                    GitHub repository
                  </a>
                  . The The Attendance Tracker Service code is licensed under
                  the MIT License. You can then make your own arrangements for
                  hosting.
                </p>
                <h2>Do not rely on information on this site</h2>
                <p>
                  The content on the Site is provided for general information
                  only. It is not intended to amount to advice on which you
                  should rely.
                </p>
                <p>
                  Although we make reasonable efforts to update the information
                  on The Attendance Tracker, we make no representations,
                  warranties or guarantees, whether express or implied, that the
                  content on The Attendance Tracker is accurate, complete or up
                  to date.
                </p>
                <h2>Our responsibility for loss or damage suffered by you</h2>
                <p>
                  <em>
                    We do not exclude or limit in any way our liability to you
                    where it would be unlawful to do so. This includes liability
                    for death or personal injury caused by our negligence or the
                    negligence of our employees, agents or subcontractors and
                    for fraud or fraudulent misrepresentation.
                  </em>
                </p>
                <p>
                  <em>
                    We exclude all implied conditions, warranties,
                    representations or other terms that may apply to The
                    Attendance Tracker or any content on them.
                  </em>
                </p>
                <p>
                  <em>
                    We will not be liable to you for any loss or damage, whether
                    in contract, tort (including negligence), breach of
                    statutory duty, or otherwise, even if foreseeable, arising
                    under or in connection with:
                  </em>
                </p>
                <ul>
                  <li>
                    <em>
                      use of, or inability to use, The Attendance Tracker; or
                    </em>
                  </li>
                  <li>
                    <em>
                      use of or reliance on any content displayed on The
                      Attendance Tracker.
                    </em>
                  </li>
                </ul>
                <p>
                  <em>In particular, we will not be liable for:</em>
                </p>
                <ul>
                  <li>
                    <em>loss of profits, sales, business, or revenue;</em>
                  </li>
                  <li>
                    <em>business interruption;</em>
                  </li>
                  <li>
                    <em>loss of anticipated savings;</em>
                  </li>
                  <li>
                    <em>
                      loss of business opportunity, goodwill or reputation; or
                    </em>
                  </li>
                  <li>
                    <em>any indirect or consequential loss or damage.</em>
                  </li>
                </ul>
                <p>
                  <em>
                    By using The Attendance Tracker, you agree that the above
                    exclusions of liability are reasonable. You accept that it
                    is always possible for you to host your own copy of the{" "}
                    <a
                      href="https://github.com/stevecalla/attendance-tracker"
                      target="_self"
                      rel="nofollow noopener"
                    >
                      The Attendance Tracker Service code
                    </a>
                    , and that your use of The Attendance Tracker is therefore
                    entirely at your own risk.
                  </em>
                </p>
                <h2>
                  We are not responsible for viruses and you must not introduce
                  them
                </h2>
                <p>
                  We do not guarantee that The Attendance Tracker will be secure
                  or free from bugs or viruses.
                </p>
                <p>
                  You are responsible for configuring your information
                  technology, computer programs and platform to access The
                  Attendance Tracker. You should use your own virus protection
                  software.
                </p>
                <p>
                  You must not misuse The Attendance Tracker by knowingly
                  introducing viruses, trojans, worms, logic bombs or other
                  material that is malicious or technologically harmful. You
                  must not attempt to gain unauthorised access to The Attendance
                  Tracker, the server on which The Attendance Tracker are stored
                  or any server, computer or database connected to The
                  Attendance Tracker. You must not attack The Attendance Tracker
                  via a denial-of-service attack or a distributed denial-of
                  service attack. By breaching this provision, you would commit
                  a criminal offence under the Computer Misuse Act 1990. We will
                  report any such breach to the relevant law enforcement
                  authorities and we will co-operate with those authorities by
                  disclosing your identity to them. In the event of such a
                  breach, your right to use The Attendance Tracker will cease
                  immediately.
                </p>
                <h2>We may make changes to these terms</h2>
                <p>
                  We amend these terms from time to time. You should check these
                  terms regularly to ensure you understand the terms that apply
                  at that time.
                </p>
                <h2>We may make changes to The Attendance Tracker</h2>
                <p>
                  We may update and change The Attendance Tracker from time to
                  time. We will aim to post details of the most significant
                  changes on the Site.
                </p>
                <h2>Which country’s laws apply to any dispute?</h2>
                <p>
                  These terms of use, their subject matter and their formation
                  (and any non-contractual disputes or claims) are governed by
                  United States law. You and we both agree to the exclusive
                  jurisdiction of the courts of Colorado.
                </p>
              </main>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <Footer />
    </>
  );
}

export default TermsPrivacy;
