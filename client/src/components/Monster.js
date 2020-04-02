import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Toast,
  ToastHeader,
  ToastBody
} from "reactstrap";
import PropTypes from "prop-types";

class Monster extends Component {
  static propTypes = {
    monster: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { monster } = this.props;
    const actions = monster.actions.map(action => (
      <Fragment key={action.name}>
        {action.name}
        <br />
        {action.desc}
        <br />
        {action.attack_bonus}
        <br />
        {action.damage_dice}
        <br />
        {action.damage_bonus}
        <br />
      </Fragment>
    ));

    return (
      <Toast>
        <ToastHeader toggle={this.props.onClose}>
          {monster.name ? monster.name : "N/A"}
        </ToastHeader>
        <ToastBody>
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
          <ToastHeader> Ability Scores / Saves</ToastHeader>
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
          <ToastHeader>Actions</ToastHeader>
          {actions}
        </ToastBody>
      </Toast>
    );
  }
}

export default Monster;
