import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, ListItem, SearchBar} from 'react-native-elements';
import {getMembersSome, getMembersAll} from '../actions/member';

class Members extends Component {
    componentDidMount() {
        this.props.actions.getMembersSome();
        this.props.actions.getMembersAll();
    }

     _keyExtractor = (item) => item._id

     _renderMember = ({item}) => {
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
                 <ListItem
                     title={
                         <View>
                             <SearchBar
                                 lightTheme={true}
                                 placeholder='Type Here...'
                             />
                         </View>
                     }
                 />
                 <FlatList
                     data={this.props.member}
                     keyExtractor={this._keyExtractor}
                     renderItem={this._renderMember}
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
        getMembersSome: func.isRequired,
        getMembersAll: func.isRequired
    }),
    member: array.isRequired
};

const mapStateToProps = (state) => ({
    member: state.memberReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        getMembersSome,
        getMembersAll
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
