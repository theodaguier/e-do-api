class SessionModel {
  constructor(client, reservations, equipments, createdAt, endAt) {
    this.client = client;
    this.reservations = reservations;
    this.equipments = equipments;
    this.createdAt = createdAt;
    this.endAt = endAt;
  }
}

module.exports = SessionModel;
