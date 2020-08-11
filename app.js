class Table {
    constructor(container,data){
        //You can use it as you like by changing it pageLimit and enumerationLimit.
        this.pageLimit          = 6;
        this.enumerationLimit   = 4;

        this.container          = container;
        this.data               = data;

        this.currentPage        = 1;
        this.currentEnumeration = 1;
        this.toggleDirection    = 0;
        this.pageNumber         = 0;

        this.createTableHTML();
        this.paginate();
    }

    createTableHTML(){
        const table     = document.createElement("table");
        const headerTr  = document.createElement("tr");
        const numberTh  = document.createElement("th");
        const nameTh    = document.createElement("th");
        const ageTh     = document.createElement("th");
        const dateTh    = document.createElement("th");

        numberTh.innerHTML  = "Number";
        nameTh.innerHTML    = "Name";
        ageTh.innerHTML     = "Age";
        dateTh.innerHTML    = "Date";

        headerTr.appendChild(numberTh);
        headerTr.appendChild(nameTh);
        headerTr.appendChild(ageTh);
        headerTr.appendChild(dateTh);
        table.appendChild(headerTr);
        
        this.data.forEach(row => {
            const middleTr = document.createElement("tr");
            const numberTd = document.createElement("td");
            const nameTd   = document.createElement("td");
            const ageTd    = document.createElement("td");
            const dateTd   = document.createElement("td");

            middleTr.classList.add("middleTr");

            numberTd.innerHTML  = row.number;      
            nameTd.innerHTML    = row.name;
            ageTd.innerHTML     = row.age;
            dateTd.innerHTML    = row.date;

            middleTr.appendChild(numberTd);
            middleTr.appendChild(nameTd);
            middleTr.appendChild(ageTd);
            middleTr.appendChild(dateTd);
            table.appendChild(middleTr);
        }); 

        numberTh.addEventListener("click", () => {
            this.toggleDirection++;
            
            if(this.toggleDirection % 2 == 1){
                this.data.sort((a, b) => {
                    return (b.number - a.number);                
                }); 
    
                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }else{
                this.data.sort((a, b) => {
                    return (a.number - b.number);                
                }); 

                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }
        });

        nameTh.addEventListener("click", () => {
            this.toggleDirection++;
            
            if(this.toggleDirection % 2 == 1){
                this.data.sort((a, b) => {
                    return a.name.localeCompare(b.name);                
                }); 
    
                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }else{
                this.data.sort((a, b) => {
                    return b.name.localeCompare(a.name);                
                }); 
    
                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }
        });

        ageTh.addEventListener("click", () => {
            this.toggleDirection++;
            
            if(this.toggleDirection % 2 == 1){
                this.data.sort((a, b) => {
                    return (b.age - a.age);                
                }); 
    
                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }else{
                this.data.sort((a, b) => {
                    return (a.age - b.age);                
                }); 

                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }
        });

        dateTh.addEventListener("click", () => {
            this.toggleDirection++;
            
            if(this.toggleDirection % 2 == 1){
                this.data.sort((a, b) => {
                    return (b.date - a.date);                
                }); 
    
                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }else{
                this.data.sort((a, b) => {
                    return (a.date - b.date);                
                }); 

                this.container.innerHTML = "";
                this.createTableHTML();
                this.paginate();
            }
        });

        this.container.appendChild(table);
        this.table = table;        
    }

    paginate(){
        const rows       = this.table.querySelectorAll("tr.middleTr");
        const maxPage    = Math.ceil(rows.length/this.pageLimit);
        
        const pagination = document.createElement("div");
        const iconLeft   = document.createElement("i");
        const iconRight  = document.createElement("i");
        this.iconLeft    = iconLeft;
        this.iconRight   = iconRight;

        pagination.classList.add("pagination");
        iconLeft.classList.add("fa","fa-chevron-left");
        iconRight.classList.add("fa","fa-chevron-right");

        pagination.appendChild(iconLeft);

        for (let i = 0; i < maxPage; i++){
            const enumeration = document.createElement("span");
            enumeration.classList.add("enumeration");

            enumeration.addEventListener("click", () => {
                this.currentPage = i + 1;
                this.changePage();
            });

            enumeration.innerHTML = i + 1;
            pagination.appendChild(enumeration);
        }

        pagination.appendChild(iconRight);
        this.container.appendChild(pagination);

        const enumerationList = document.querySelectorAll(".pagination span")
        const start           = (this.currentEnumeration - 1) * this.enumerationLimit;
        const end             = start + this.enumerationLimit;
        const maxEnumeration  = Math.ceil(enumerationList.length / this.enumerationLimit);
        this.maxEnumeration   = maxEnumeration;

            enumerationList.forEach(enu => {            
                enu.classList.add("d-none");
                enu.classList.remove("enumeration");
            });
    
            for(let i = start; i < end; i++){    
                if(typeof enumerationList[i] != "undefined"){
                    enumerationList[i].classList.remove("d-none");
                    enumerationList[i].classList.add("enumeration");
                }        
            };

        iconRight.addEventListener("click", () => {
            this.currentEnumeration++;
            this.pageNumber++;  
            this.changeBtn();
            this.currentPage = (this.pageNumber * this.enumerationLimit) + 1;
            this.changePage();
        });

        iconLeft.addEventListener("click", () => {
            this.currentEnumeration--;    
            this.pageNumber--;                    
            this.changeBtn();
            this.currentPage = (this.pageNumber * this.enumerationLimit) + 1;
            this.changePage();
        });

        this.changePage();              
    }
    
    changeBtn(){
        const enumerationList = document.querySelectorAll(".pagination span")
        const start           = (this.currentEnumeration - 1) * this.enumerationLimit;
        const end             = start + this.enumerationLimit;

        enumerationList.forEach(enu => {
            enu.classList.remove("enumeration");
            enu.classList.add("d-none");
        });

        for (let i = start; i < end; i++){       
            if(typeof enumerationList[i] != "undefined"){
                enumerationList[i].classList.remove("d-none");
                enumerationList[i].classList.add("enumeration");
            }                                      
        };

        document.querySelectorAll(".enumeration").forEach(enumeration => {
            enumeration.classList.remove("active");
        });

        document.querySelector(".enumeration:nth-child("+ ((this.enumerationLimit * this.currentEnumeration) - (this.enumerationLimit - 2)) +")").classList.add("active");        
    }

    changePage(){
        const rows  = this.table.querySelectorAll("tr.middleTr");
        const start = (this.currentPage-1) * this.pageLimit;
        const end   = start + this.pageLimit;

        if(this.currentEnumeration == 1){
            this.iconLeft.classList.remove("fa","fa-chevron-left")
            this.iconLeft.classList.add("d-none");
        }else{
            this.iconLeft.classList.add("fa","fa-chevron-left")
            this.iconLeft.classList.remove("d-none");
        }

        if(this.currentEnumeration == this.maxEnumeration){
            this.iconRight.classList.remove("fa","fa-chevron-right")
            this.iconRight.classList.add("d-none");
        }else{
            this.iconRight.classList.add("fa","fa-chevron-right")
            this.iconRight.classList.remove("d-none");
        }

        rows.forEach(row => {
            row.classList.add("d-none");
        });

        for (let i = start; i < end; i++){
            if(typeof rows[i] != "undefined"){
                rows[i].classList.remove("d-none");
            }
        };

        document.querySelectorAll(".enumeration").forEach(enumeration => {
            enumeration.classList.remove("active");
        });

        document.querySelector(".enumeration:nth-child("+ (this.currentPage + 1) +")").classList.add("active");
    }
}

let datas = [
    {
        number  : 1,
        name    : "Hasan",
        age     : 24,
        date    : 1996
    },
    {
        number  : 2,
        name    : "Yağmur",
        age     : 27,
        date    : 1993
    },
    {
        number  : 3,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 4,
        name    : "Umut",
        age     : 25,
        date    : 1995
    },
    {
        number  : 5,
        name    : "Tuğçe",
        age     : 21,
        date    : 1999
    },
    {
        number  : 6,
        name    : "Tarık",
        age     : 20,
        date    : 2000
    },
    {
        number  : 7,
        name    : "Ahmet",
        age     : 18,
        date    : 2002
    },
    {
        number  : 8,
        name    : "Ayşe",
        age     : 19,
        date    : 2003
    },
    {
        number  : 9,
        name    : "Buket",
        age     : 21,
        date    : 1999
    },
    {
        number  : 10,
        name    : "Deniz",
        age     : 29,
        date    : 1991
    },
    {
        number  : 11,
        name    : "Elif",
        age     : 16,
        date    : 2004
    },
    {
        number  : 12,
        name    : "Emre",
        age     : 15,
        date    : 2005
    },
    {
        number  : 13,
        name    : "Hasan",
        age     : 24,
        date    : 1996
    },
    {
        number  : 14,
        name    : "Faruk",
        age     : 33,
        date    : 1987
    },
    {
        number  : 15,
        name    : "Gizem",
        age     : 30,
        date    : 1990
    },
    {
        number  : 16,
        name    : "Zekiye",
        age     : 34,
        date    : 1886
    },
    {
        number  : 17,
        name    : "Enes",
        age     : 14,
        date    : 2006
    },
    {
        number  : 18,
        name    : "Tarık",
        age     : 20,
        date    : 2000
    },
    {
        number  : 19,
        name    : "Hasan",
        age     : 24,
        date    : 1996
    },
    {
        number  : 20,
        name    : "Aycan",
        age     : 29,
        date    : 1991
    },
    {
        number  : 21,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 22,
        name    : "Umut",
        age     : 25,
        date    : 1995
    },
    {
        number  : 23,
        name    : "Kemal",
        age     : 21,
        date    : 1999
    },
    {
        number  : 24,
        name    : "Elisa",
        age     : 7,
        date    : 2013
    },
    {
        number  : 25,
        name    : "Oya",
        age     : 24,
        date    : 1996
    },
    {
        number  : 26,
        name    : "Kaya",
        age     : 37,
        date    : 1983
    },
    {
        number  : 27,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 28,
        name    : "Zeynep",
        age     : 25,
        date    : 1995
    },
    {
        number  : 29,
        name    : "Ömer",
        age     : 14,
        date    : 2006
    },
    {
        number  : 30,
        name    : "Tuğba",
        age     : 16,
        date    : 2004
    },
    {
        number  : 31,
        name    : "Halim",
        age     : 39,
        date    : 1981
    },
    {
        number  : 32,
        name    : "Eda",
        age     : 24,
        date    : 1996
    },
    {
        number  : 33,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 34,
        name    : "Fatma",
        age     : 12,
        date    : 2008
    },
    {
        number  : 35,
        name    : "Yeliz",
        age     : 26,
        date    : 1994
    },
    {
        number  : 36,
        name    : "Pelin",
        age     : 20,
        date    : 2000
    },
    {
        number  : 37,
        name    : "Rıfkı",
        age     : 40,
        date    : 1980
    },
    {
        number  : 38,
        name    : "Tayfur",
        age     : 24,
        date    : 1996
    },
    {
        number  : 39,
        name    : "Ebru",
        age     : 27,
        date    : 1993
    },
    {
        number  : 40,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 41,
        name    : "Umut",
        age     : 25,
        date    : 1995
    },
    {
        number  : 42,
        name    : "İrem",
        age     : 29,
        date    : 1991
    },
    {
        number  : 43,
        name    : "Tarık",
        age     : 20,
        date    : 2000
    },
    {
        number  : 44,
        name    : "Hakan",
        age     : 21,
        date    : 1999
    },
    {
        number  : 45,
        name    : "Leman",
        age     : 28,
        date    : 1992
    },
    {
        number  : 46,
        name    : "Hasan",
        age     : 24,
        date    : 1996
    },
    {
        number  : 47,
        name    : "Yağmur",
        age     : 27,
        date    : 1993
    },
    {
        number  : 48,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 49,
        name    : "Umut",
        age     : 25,
        date    : 1995
    },
    {
        number  : 50,
        name    : "Tuğçe",
        age     : 21,
        date    : 1999
    },
    {
        number  : 51,
        name    : "Tarık",
        age     : 20,
        date    : 2000
    },
    {
        number  : 52,
        name    : "Ahmet",
        age     : 18,
        date    : 2002
    },
    {
        number  : 53,
        name    : "Ayşe",
        age     : 19,
        date    : 2003
    },
    {
        number  : 54,
        name    : "Buket",
        age     : 21,
        date    : 1999
    },
    {
        number  : 55,
        name    : "Deniz",
        age     : 29,
        date    : 1991
    },
    {
        number  : 56,
        name    : "Elif",
        age     : 16,
        date    : 2004
    },
    {
        number  : 57,
        name    : "Emre",
        age     : 15,
        date    : 2005
    },
    {
        number  : 58,
        name    : "Hasan",
        age     : 24,
        date    : 1996
    },
    {
        number  : 59,
        name    : "Faruk",
        age     : 33,
        date    : 1987
    },
    {
        number  : 60,
        name    : "Gizem",
        age     : 30,
        date    : 1990
    },
    {
        number  : 61,
        name    : "Zekiye",
        age     : 34,
        date    : 1886
    },
    {
        number  : 62,
        name    : "Enes",
        age     : 14,
        date    : 2006
    },
    {
        number  : 63,
        name    : "Tarık",
        age     : 20,
        date    : 2000
    },
    {
        number  : 64,
        name    : "Hasan",
        age     : 24,
        date    : 1996
    },
    {
        number  : 65,
        name    : "Aycan",
        age     : 29,
        date    : 1991
    },
    {
        number  : 66,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 67,
        name    : "Umut",
        age     : 25,
        date    : 1995
    },
    {
        number  : 68,
        name    : "Kemal",
        age     : 21,
        date    : 1999
    },
    {
        number  : 69,
        name    : "Elisa",
        age     : 7,
        date    : 2013
    },
    {
        number  : 70,
        name    : "Oya",
        age     : 24,
        date    : 1996
    },
    {
        number  : 71,
        name    : "Kaya",
        age     : 37,
        date    : 1983
    },
    {
        number  : 72,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 73,
        name    : "Zeynep",
        age     : 25,
        date    : 1995
    },
    {
        number  : 74,
        name    : "Ömer",
        age     : 14,
        date    : 2006
    },
    {
        number  : 75,
        name    : "Tuğba",
        age     : 16,
        date    : 2004
    },
    {
        number  : 76,
        name    : "Halim",
        age     : 39,
        date    : 1981
    },
    {
        number  : 77,
        name    : "Eda",
        age     : 24,
        date    : 1996
    },
    {
        number  : 78,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 79,
        name    : "Fatma",
        age     : 12,
        date    : 2008
    },
    {
        number  : 80,
        name    : "Yeliz",
        age     : 26,
        date    : 1994
    },
    {
        number  : 81,
        name    : "Pelin",
        age     : 20,
        date    : 2000
    },
    {
        number  : 82,
        name    : "Rıfkı",
        age     : 40,
        date    : 1980
    },
    {
        number  : 83,
        name    : "Tayfur",
        age     : 24,
        date    : 1996
    },
    {
        number  : 84,
        name    : "Ebru",
        age     : 27,
        date    : 1993
    },
    {
        number  : 85,
        name    : "Murat",
        age     : 17,
        date    : 2003
    },
    {
        number  : 86,
        name    : "Umut",
        age     : 25,
        date    : 1995
    },
    {
        number  : 87,
        name    : "İrem",
        age     : 29,
        date    : 1991
    },
    {
        number  : 88,
        name    : "Tarık",
        age     : 20,
        date    : 2000
    },
    {
        number  : 89,
        name    : "Hakan",
        age     : 21,
        date    : 1999
    },
    {
        number  : 90,
        name    : "Leman",
        age     : 28,
        date    : 1992
    }
];

new Table(document.getElementById("container"),datas);
 