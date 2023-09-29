class SessionModel {
  constructor(id, client, reservations, equipments, createdAt, endAt) {
    this.id = id;
    this.client = client;
    this.reservations = reservations;
    this.equipments = equipments;
    this.createdAt = createdAt;
    this.endAt = endAt;
  }
}

module.exports = SessionModel;
