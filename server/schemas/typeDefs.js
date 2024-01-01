const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    firstName: String
    lastName: String
    cell: String
    isAdmin: Boolean
    isLocked: Boolean
    isDisplayable: Boolean
    emailSend: [EmailSend]
    userZoom: [UserZoom]
  }

  type EmailSend {
    _id: ID
    fromEmail: String
    toEmail: String
    subject: String
    firstName: String
    source: String
    token: String
    textContent: String
    htmlContent: String
    wasSent: Boolean
    isDisplayable: Boolean
    messageId: String
    response: String
    user: User
  }

  # For the UserZoom model
  type PhoneNumber {
    country: String!
    code: String!
    number: String!
    verified: Boolean!
    label: String
  }

  type UserZoom {
    _id: ID
    zoom_id: String
    first_name: String
    last_name: String
    display_name: String
    email: String
    role_name: String
    timezone: String
    last_client_version: String
    pic_url: String
    language: String
    status: String
    job_title: String
    location: String
    login_types: [Int]
    phone_numbers: [PhoneNumber]
    user_created_at: String
    is_installed: Boolean
    user: User
  }

  type ZoomMeeting {
    type: String
    uid: String
    aud: String
    iss: String
    ts: String
    exp: String
    entitlements: [String]
    mid: String
    attendrole: String
    raw_data: [String]
  }

  type Employee {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    phone: String
    isAdmin: Boolean
    isLocked: Boolean
    schedule: [Schedule]
    isDisplayable: Boolean
    hasDriversLicense: String
    hour: [Hour]
  }

  type Message {
    message: String!
    employee: Employee
  }

  type Schedule {
    _id: ID
    streetAddress: String
    suite: String
    city: String
    state: String
    zip: String
    startDate: String
    endDate: String
    startTime: String
    endTime: String
    squareFeet: String
    jobDetails: String
    numberOfClientEmployees: String
    client: Client
    employees: [Employee]
    isDisplayable: Boolean
  }

  type Auth {
    token: ID!
    user: User
    #employee: Employee
  }

  type Client {
    _id: ID
    businessName: String
    streetAddress: String
    suite: String
    city: String
    state: String
    zip: String
    contact: String
    phone: String
    email: String
    schedule: [Schedule]
    isDisplayable: Boolean
  }

  type Hour {
    _id: ID
    jobDate: String
    startTime: String
    endTime: String
    hoursWorked: String
    employee: Employee
  }

  type Query {
    users: [User]!
    me(_id: ID!): User
    userByEmail(email: String!): User
    #user(email: String!): User

    userZooms: [UserZoom]!
    #userZoneByEmail(email: String!): UserZoom
    #userZoneByEmail(zoomId: String!): UserZoom

    #clients: [Client]!
    clients(isDisplayable: Boolean): [Client]!
    client(_id: ID!): Client
    #employees: [Employee]!
    employees(isDisplayable: Boolean): [Employee]!
    employeeByEmail(email: String!): Employee
    employeeById(_id: ID!): Employee
    #employeeById(_id: ID!, isDisplayable: Boolean): Employee
    #schedules: [Schedule]
    schedules(isDisplayable: Boolean): [Schedule]!
    schedule(scheduleId: ID!): Schedule

    hours: [Hour]
    hoursById(_id: ID!): Hour
    hoursByEmployeeId(employee: ID!): [Hour]
    hoursByEmployeeIdByJobDate(employee: ID!, jobDate: String): [Hour]
  }

  # SECTION SEND EMAILS
  type Query {
    # send email via SendGrid
    sendEmail(
      toEmail: String
      fromEmail: String
      subject: String
      textContent: String
      htmlContent: String
    ): String
    emailSends: [EmailSend]!
    emailsByNotSent(wasSent: Boolean): [EmailSend]!
  }

  # SECTION MUTATIONS
  type Mutation {
    # SECTION LOGIN, SIGNUP/ADD USER, RESET PASSWORD
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    forgotPassword(email: String!, password: String!): Auth

    updatePassword(_id: ID, password: String): Employee

    # SECTION EMAILSEND
    addEmailSend(
      toEmail: String
      fromEmail: String
      subject: String
      firstName: String
      source: String
      token: String
      textContent: String
      htmlContent: String
      user: String
    ): EmailSend

    updateEmailSend(
      _id: ID!
      toEmail: String
      fromEmail: String
      subject: String
      firstName: String
      source: String
      token: String
      textContent: String
      htmlContent: String
      wasSent: String
      isDisplayable: String
      user: String
    ): EmailSend

    deleteEmailSend(_id: ID!): EmailSend

    softDeleteEmailSend(_id: ID!, isDisplayable: Boolean): EmailSend

    # SECTION CLIENT
    addClient(
      businessName: String
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      contact: String
      phone: String
      email: String
      isDisplayable: Boolean
    ): Client

    deleteClient(_id: ID!): Client

    softDeleteClient(_id: ID!, isDisplayable: Boolean): Client

    updateClient(
      _id: ID!
      businessName: String
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      contact: String
      phone: String
      email: String
    ): Client

    updateClientSchedule(_id: ID, schedule: String): Client

    # SECTION EMPLOYEE
    addEmployee(
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      isAdmin: Boolean
      isLocked: Boolean
      isDisplayable: Boolean
      hasDriversLicense: String
    ): Employee

    signupEmployee(email: String, password: String): Auth

    deleteEmployee(_id: ID!): Employee

    softDeleteEmployee(_id: ID!, isDisplayable: Boolean): Employee

    updateEmployee(
      _id: ID
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      isAdmin: Boolean
      isLocked: Boolean
      schedule: String
      hasDriversLicense: String
      hours: String
    ): Employee

    updateEmployeeForm(
      _id: ID
      firstName: String
      lastName: String
      email: String
      phone: String
      hasDriversLicense: String
    ): Employee

    updateEmployeeSchedule(_id: ID, schedule: String): Employee

    updateEmployeeHour(_id: ID, hour: String): Employee

    removeEmployeeSchedule(_id: ID, schedule: String): Employee

    toggleAdmin(employeeId: ID!): Message

    toggleLocked(employeeId: ID!): Message

    # SECTION HOURS
    addHour(
      jobDate: String
      startTime: String
      endTime: String
      hoursWorked: String
      employee: String
    ): Hour

    updateHourByEmployeeIdByJobDate(
      jobDate: String
      startTime: String
      endTime: String
      hoursWorked: String
      employee: String
    ): Hour

    deleteHours(employee: String, jobDate: String): Hour

    # SECTION SCHEDULE / JOB
    addSchedule(
      _id: ID
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      startDate: String
      endDate: String
      startTime: String
      endTime: String
      squareFeet: String
      jobDetails: String
      numberOfClientEmployees: String
      client: String
      employees: [String]
      isDisplayable: Boolean
    ): Schedule

    deleteSchedule(_id: ID!): Schedule

    softDeleteSchedule(_id: ID!, isDisplayable: Boolean): Schedule

    updateSchedule(
      _id: ID
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      startDate: String
      endDate: String
      startTime: String
      endTime: String
      squareFeet: String
      jobDetails: String
      numberOfClientEmployees: String
      client: String
      employees: [String]
    ): Schedule
  }
`;

module.exports = typeDefs;
