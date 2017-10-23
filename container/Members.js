import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, ListItem, SearchBar, ButtonGroup} from 'react-native-elements';
import {getMembersPage1, getMembersPage2} from '../actions/member';

class Members extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 1
        };
    }

    async componentDidMount() {
        await this.props.actions.getMembersPage1();
        this.props.actions.getMembersPage2();
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
         const buttons = ['Email', 'First Name', 'Last Name'];
         const {selectedIndex} = this.state;
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
                 <View>
                     <ButtonGroup
                         selectedIndex={selectedIndex}
                         buttons={buttons}
                     />
                 </View>
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
        getMembersPage1: func.isRequired,
        getMembersPage2: func.isRequired
    }),
    member: array.isRequired
};

const mapStateToProps = (state) => ({
    member: state.memberReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        getMembersPage1,
        getMembersPage2
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
