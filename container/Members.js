import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, ListItem} from 'react-native-elements';
import {getMembers} from '../actions/member';

class Members extends Component {
    componentDidMount() {
        this.props.actions.getMembers();
    }

     _keyExtractor = (item) => item._id

     _renderItem = ({item}) => {
         return (
             <ListItem
                 roundAvatar={true}
                 title={`${item.first_name} ${item.last_name}`}
                 subtitle={item.email}
                 avatar={{uri: item.image_url}}
             />
         );
     };

     render() {
         return (
             <List style={styles.container}>
                 <FlatList
                     data={this.props.member}
                     keyExtractor={this._keyExtractor}
                     renderItem={this._renderItem}
                 />
             </List>
         );
     }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
    }
});

const {func, shape, array} = PropTypes;
Members.propTypes = {
    actions: shape({
        getMembers: func.isRequired
    }),
    member: array
};

const mapStateToProps = (state) => ({
    member: state.memberReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        getMembers
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
