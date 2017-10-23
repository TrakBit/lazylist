import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, ListItem, SearchBar, ButtonGroup} from 'react-native-elements';
import {getMembersPage1, getMembersPage2, getMembersSearch} from '../actions/member';

class Members extends Component {
    constructor() {
        super();
        this.state = {
            selectedFilter: 0
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

     _changeFilter = (selectedFilter) => this.setState({selectedFilter});

     _search = (text) => {
         const {selectedFilter} = this.state;
         if (selectedFilter === 0) {
             const searchText = (text).toLowerCase();
             this.props.actions.getMembersSearch(searchText, 0);
         } else if (selectedFilter === 1) {
             this.props.actions.getMembersSearch(text, 1);
         } else if (selectedFilter === 2) {
             this.props.actions.getMembersSearch(text, 2);
         }
     }

     render() {
         const buttons = ['Email', 'First Name', 'Last Name'];
         const {selectedFilter} = this.state;
         return (
             <List style={styles.container}>
                 <ListItem
                     title={
                         <SearchBar
                             lightTheme={true}
                             placeholder='Type Here...'
                             onChangeText={(text) => this._search(text)}
                         />
                     }
                 />
                 <ButtonGroup
                     onPress={(val) => this._changeFilter(val)}
                     selectedIndex={selectedFilter}
                     buttons={buttons}
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
        getMembersPage1: func.isRequired,
        getMembersPage2: func.isRequired,
        getMembersSearch: func.isRequired
    }),
    member: array.isRequired
};

const mapStateToProps = (state) => ({
    member: state.memberReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        getMembersPage1,
        getMembersPage2,
        getMembersSearch
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
