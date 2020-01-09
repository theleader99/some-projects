import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Marker} from 'google-map-react';
export default class locationForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        name: '',
        city: 'Ha Noi',
        district: '',
        detailAddress: '',
        spaBath: false,
        takeCare: false,
        hairTrimning: false,
        dog: false,
        cat: false,
        productivity: undefined,
        openTime: '',
        closeTime: '',
        highestPrice: '',
        lowestPrice: '',
        arrayCity: [],
        arrayDistrist: [],
        lat: undefined,
        lng: undefined,
        imageFile: undefined,
        base64Image: '',
        
    };
    componentWillMount() {
        fetch('http://10.1.10.243:3001/api/city/getCity', {
            headers: {
                'Content-Type': 'Application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log("aaaa");
                    this.setState({
                        arrayCity: data.data
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(`http://10.1.10.243:3001/api/city/getDistrict?city=${this.state.city}`, {
            headers: {
                'Content-Type': 'Application/json',
            },
            credentials: 'include'
        })
            .then((respon) => {
                return respon.json();
            })
            .then((dataresult) => {
                if (dataresult.success) {


                    this.setState({
                        arrayDistrist: dataresult.data.district
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    handleChangeCity = (event) => {
        this.setState({
            city: event.target.value,
        })
        fetch(`http://10.1.10.243:3001/api/city/getDistrict?city=${event.target.value}`, {
            headers: {
                'Content-Type': 'Application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {

                    console.log(data);
                    this.setState({
                        arrayDistrist: data.data.district
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };
    handleChangeOpenTime = (event) => {
        this.setState({
            openTime: event.target.value,
        })
    };
    handleChangeCloseTime = (event) => {
        this.setState({
            closeTime: event.target.value,
        })
    }
    handleChangeDistrict = (event) => {
        console.log(event.target.value);
        this.setState({
            district: event.target.value,
        })
    }
    handleChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    };
    handleChangeDetailAddress = (event) => {
        this.setState({
            detailAddress: event.target.value,
        })
    }
    handleChangeProductivity = (event) => {
        this.setState({
            productivity: event.target.value,
        })
    };
    handleChangeHiPrice = (event) => {
        this.setState({
            highestPrice: event.target.value,
        })
    };
    handleChangeLoPrice = (event) => {
        this.setState({
            lowestPrice: event.target.value,
        })
    };
    onCheckCat = () => {
        this.setState({
            cat: !this.state.cat,
        })
    }
    onCheckDog = () => {
        this.setState({
            dog: !this.state.dog,
        })
    }
    onCheckSpaBath = () => {
        this.setState({
            spaBath: !this.state.spaBath,
        })
    }
    onCheckTakeCare = () => {
        this.setState({
            takeCare: !this.state.takeCare,
        })
    }
    onCheckHair = () => {
        this.setState({
            hairTrimning: !this.state.hairTrimning,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://10.1.10.243:3001/api/location/createNewLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                nameLocation: this.state.name,
                address: {
                    city: this.state.city,
                    district: this.state.district,
                    detailAddress: this.state.detailAddress,
                },
                locationMap: {
                    lat: "123",
                    lng: '234',
                },
                service: {
                    hairTrimning: this.state.hairTrimning,
                    spaBath: this.state.spaBath,
                    takeCare: this.state.takeCare,
                },
                petType: {
                    dog: this.state.dog,
                    cat: this.state.cat,
                },
                productivity: this.state.productivity,
                openTime: this.state.openTime,
                closeTime: this.state.closeTime,
                highestPrice: this.state.highestPrice,
                lowestPrice: this.state.lowestPrice,
                imageUrl: []
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    handleFileChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    imageFile: imageFile,
                    base64Image: reader.result,
                });
            };
            reader.readAsDataURL(imageFile);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
        });

        // fetch upload file
        const formData = new FormData();
        formData.append('image', this.state.imageFile);
        fetch('http://10.1.10.243:3001/api/uploadImages', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data.success) {
                    this.setState({
                        loading: false,
                        errorMessage: data.message,
                    });
                } else {
                    this.setState({
                        loading: false,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                  errorMessage: error.message,
                  loading: false,
                });
              });
            }  
                    render() {
                        console.log(this.state);
                        return (
                            <div className="locationContainer">
                                <div className="header">
                                    <h1>Thêm địa điểm</h1>
                                </div>
                                <div className="feedback-form">
                                    <div className="feedback-table">
                                        <div className="information-name">
                                            Thông tin cơ bản
                        </div>
                                        <hr />
                                        <div className="information-content">
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Tên địa điểm
                                        <span>*</span>
                                                </div>
                                                <div className="details">
                                                    <input type="text" name="Name" value={this.state.name} onChange={this.handleChangeName} />
                                                </div>
                                            </div>

                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Tỉnh thành
                                        <span>*</span>
                                                </div>
                                                <div className="details">
                                                    <div className="province">
                                                        <select className="provinceId" onChange={this.handleChangeCity} value={this.state.city}>

                                                            {this.state.arrayCity.map((item) => {
                                                                return (
                                                                    <option key={item}>{item.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="district">
                                                        <select className="districtId" value={this.state.district} onChange={this.handleChangeDistrict}>
                                                            <option>--Choose--</option>
                                                            {this.state.arrayDistrist.map((item) => {
                                                                return (
                                                                    <option key={item}>{item}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Địa chỉ
                                        <span>*</span>
                                                </div>
                                                <div className="details">
                                                    <input type="text" name="Address" onChange={this.handleChangeDetailAddress} value={this.state.detailAddress} />
                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Vị trí
                                        <span>*</span>
                                                </div>
                                                <div className="details">
                                                    <a className="updateLocation">Cập nhật vị trí</a>
                                                    <div style={{ height: '400px', width: '600px' }}>
                                      <GoogleMapReact
                                      
                            bootstrapURLKeys={{ key:'AIzaSyAbjl1FZyvVwzbeWFLEP24gAhMfZ-0IqMA'}}
                            defaultCenter={
                                { lat: 30, lng: 40 }
                            }
                            defaultZoom={11}
                          />
                        </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                     
                                      
                                        <div className="information-name">
                                            Thông tin khác
                        </div>
                                        <hr />
                                        <div className="information-content">
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Dịch vụ
                                        <span>*</span>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" checked={this.state.spaBath} onChange={this.onCheckSpaBath} />
                                                    <label className="form-check-label" for="exampleCheck1">Tắm</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" checked={this.state.hairTrimning} onChange={this.onCheckHair} />
                                                    <label className="form-check-label" for="exampleCheck1">Tóc</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" checked={this.state.takeCare} onChange={this.onCheckTakeCare} />
                                                    <label className="form-check-label" for="exampleCheck1">Trông</label>
                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Loại pet
                                        <span>*</span>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" checked={this.state.dog} onChange={this.onCheckDog} />
                                                    <label className="form-check-label" for="exampleCheck1">Chó</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" checked={this.state.cat} onChange={this.onCheckCat} />
                                                    <label className="form-check-label" for="exampleCheck1">Mèo</label>
                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Số lượng phục vụ
                                        <span>*</span>
                                                </div>
                                                <div className="details">
                                                    <input type="number" name="Quanties" onChange={this.handleChangeProductivity} value={this.state.productivity} />
                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Giờ mở cửa
                                        <span>*</span>
                                                </div>
                                                <div className="details">
                                                    <div className="hourPet">
                                                        <select className="hourOpen" value={this.state.openTime} onChange={this.handleChangeOpenTime}>
                                                            <option>00</option>
                                                            <option>01</option>
                                                            <option>02</option>
                                                            <option>03</option>
                                                            <option>04</option>
                                                            <option>05</option>
                                                            <option>06</option>
                                                            <option>07</option>
                                                            <option>08</option>
                                                            <option>09</option>
                                                            <option>10</option>
                                                            <option>11</option>
                                                            <option>12</option>
                                                            <option>13</option>
                                                            <option>14</option>
                                                            <option>15</option>
                                                            <option>16</option>
                                                            <option>17</option>
                                                            <option>18</option>
                                                            <option>19</option>
                                                            <option>20</option>
                                                            <option>21</option>
                                                            <option>22</option>
                                                            <option>23</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Giờ đóng cửa
                                        <span>*</span>
                                                </div>
                                                <div className="details">
                                                    <div className="hourPet">
                                                        <select className="hourClose" value={this.state.closeTime} onChange={this.handleChangeCloseTime}>
                                                            <option>01</option>
                                                            <option>02</option>
                                                            <option>03</option>
                                                            <option>04</option>
                                                            <option>05</option>
                                                            <option>06</option>
                                                            <option>07</option>
                                                            <option>08</option>
                                                            <option>09</option>
                                                            <option>10</option>
                                                            <option>11</option>
                                                            <option>12</option>
                                                            <option>13</option>
                                                            <option>14</option>
                                                            <option>15</option>
                                                            <option>16</option>
                                                            <option>17</option>
                                                            <option>18</option>
                                                            <option>19</option>
                                                            <option>20</option>
                                                            <option>21</option>
                                                            <option>22</option>
                                                            <option>23</option>
                                                            <option>24</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Highest Price
                
                                </div>
                                                <div className="details">
                                                    <input type="text" name="Quanties" onChange={this.handleChangeHiPrice} value={this.state.highestPrice} />
                                                </div>
                                            </div>
                                            <div className="box-information-normal">
                                                <div className="label">
                                                    Lowest Price
                
                                </div>
                                                <div className="details">
                                                    <input type="text" name="Quanties" onChange={this.handleChangeLoPrice} value={this.state.lowestPrice} />
                                                </div>
                                            </div>
                                            <div>

                                                <div className='container mt-5'>
                                                    <h4>Hình ảnh mô tả</h4>

                                                    <form onSubmit={this.handleSubmit}>
                                                        <div>
                                                            <label>Image:</label>
                                                            <div className='preview' style={{
                                                                backgroundImage: `url(${this.state.base64Image})`
                                                            }}>
                                                                {this.state.base64Image ? null : (
                                                                    <div>Select your favorite image ...</div>
                                                                )}
                                                            </div>
                                                            <input
                                                                type='file'
                                                                className='btn btn-outline-primary file-input'
                                                                onChange={this.handleFileChange}
                                                            />
                                                        </div>

                                                        

                                                        <p className="text-danger">{this.state.errorMessage}</p>

                                                        <div className='mb-5 mt-2'>
                                                            {this.state.loading ? (
                                                                <div className="spinner-border" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            ) : (
                                                                    <button type='submit' className='btn btn-primary'>
                                                                        Save
                                                    </button>
                                                                )}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-success" onClick={this.handleSubmit}>Create</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
