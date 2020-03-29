import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import PropTypes from "prop-types";

class Monster extends Component {
  static propTypes = {
    monster: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { monster } = this.props;
    return (
      <Card>
        <CardHeader>{monster.name ? monster.name : "N/A"}</CardHeader>
        <CardBody>
          [Size] {monster.size}
          <br />
          [Type] {monster.type}
          <br />
          [Subtype] {monster.subtype}
          <br />
          [Alignment] {monster.alignment}
          <br />
          [Armor Class] {monster.armor_class}
          <br />
          [Armor Description]{monster.armor_desc}
          <br />
          [Hit Points]{monster.hit_points}
          <br />
          [Hit Dice]{monster.hit_dice}
          <br />= Ability Scores / Saves =
          <br />
          [Strength] {monster.strength} / {monster.strength_save}
          <br />
          [Dexterity] {monster.dexterity} / {monster.dexterity_save}
          <br />
          [Constitution] {monster.constitution} / {monster.constitution_save}
          <br />
          [Wisdom] {monster.wisdom} / {monster.wisdom_save}
          <br />
          [Charisma] {monster.dexterity} / {monster.dexterity_save}
          <br />
          [Dexterity] {monster.dexterity} / {monster.dexterity_save}
        </CardBody>
      </Card>
    );
  }
}

export default Monster;
