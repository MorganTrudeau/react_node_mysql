import React, { Component } from 'react';
import '../styles/Home.css';
import CampaignSelect from '../components/CampaignSelect';
import AddCampaignModal from '../components/AddCampaignModal';
import ApplicantTable from '../components/ApplicantTable';
import PositionTable from '../components/PositionTable';
import AddPositionModal from '../components/AddPositionModal';
import AddApplicantModal from '../components/AddApplicantModal';
import {getPositions} from '../functions/API';
import {getApplicants} from '../functions/API';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      positions: [],
      applicants: [],
      selectedPosition: '',
      selectedCampaign: '',
      addCampaign: false
    };
  }

  campaignSelected(selectedCampaign) {
    if(selectedCampaign !== "") {
      console.log(`Getting positions with campaign_id: ${selectedCampaign}`);
      this.setState({ selectedCampaign:selectedCampaign });
      getPositions(selectedCampaign).then(positions => {
        if(positions) {
          this.setState({ positions:positions, applicants: [] });
        }
      })
      .catch(err => {
        console.log(err);
      });
    } 
    else {
      this.setState({ selectedCampaign:'', positions: [], applicants: [] });
    }
  }

  positionSelected(selectedPosition) {
    this.setState({ selectedPosition:selectedPosition })
    getApplicants(selectedPosition).then(applicants => {
      if(applicants) {
        this.setState({ applicants:applicants });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }


  render() {
    return (
        <div className="home">
          <div className="cell0">
            <CampaignSelect
              className="campaignSelect"
              campaignSelected={ (selectedCampaign) => this.campaignSelected(selectedCampaign) }
            />
            <AddCampaignModal className="addCampaignModal" />
            <PositionTable 
              positionSelected={ (selectedPosition) => this.positionSelected(selectedPosition) } 
              positions={ this.state.positions } 
            />
            <AddPositionModal selectedCampaign={ this.state.selectedCampaign } />
          </div>
          <div className="cell1">
            <AddApplicantModal selectedCampaign={ this.state.selectedCampaign } />
            <ApplicantTable applicants={ this.state.applicants } />
          </div>  
        </div>
    );
  }
}

export default Home;
