
let tabProd = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

class Tableau extends React.Component {
    constructor(props) {
        super(props)
        this.state = { rech: "", chk: false, tableau: [...tabProd] }
        this.chgRech = this.chgRech.bind(this)
        this.chgCheck = this.chgCheck.bind(this)
    }
    renvoisRayons() {
        let distinctRayons = tabProd.filter((ligne, indice, tableau) => {
            return tableau.findIndex((elem) => elem.category === ligne.category) === indice
        })
        console.log(tabProd)
        console.log(distinctRayons)
        return distinctRayons
    }
    renvoisRayons_old() {
        let distinctRayons = []
        for (let i in this.state.tableau) {
            let inTab = -1
            for (let j in this.state.tableau) {
                if (this.state.tableau[j].category === this.state.tableau[i].category) {
                    inTab = j
                    break
                }
            }
            if (inTab == i) {
                let tmp = JSON.parse(JSON.stringify(this.state.tableau[i]))
                distinctRayons.push(tmp)
            }
        }
        console.log(distinctRayons)
        return distinctRayons
    }
    renvoisProdRayon(nomRayon) {
        let produitRayon = tabProd.filter((ligne, indice, tableau) => {
            return ligne.category === nomRayon
        })
        return produitRayon
    }
    renvoisProdRayon_old(nomRayon) {
        let produitRayon = []
        for (let i in this.state.tableau) {
            if (this.state.tableau[i].category === nomRayon) {
                let tmp = JSON.parse(JSON.stringify(this.state.tableau[i]))
                produitRayon.push(tmp)
            }
        }
        console.log(produitRayon)
        return produitRayon
    }
    renvoisProdFiltre(stock, recherche) {
        if (stock == true) {
            let produitStock = tabProd.filter((ligne) => {
                return ligne.stocked === stock
            })
            let prodStockRet = produitStock.filter((ligne) => {
                return ligne.name.match(new RegExp(recherche, "i"))
            })
            return prodStockRet
        } else {
            let prodStockRet = tabProd.filter((ligne) => {
                return ligne.name.match(new RegExp(recherche, "i"))
            })
            return prodStockRet
        }
    }
    chgRech(event) {
        this.setState({ rech: event.target.value })
        this.setState({ tableau: this.renvoisProdFiltre(this.state.chk, event.target.value) })

    }
    chgCheck(event) {
        this.setState({ chk: event.target.checked })
        this.setState({ tableau: this.renvoisProdFiltre(event.target.checked, this.state.rech) })
    }
    render() {
        let rayons = this.renvoisRayons_old()
        return (
            <section>
                <InputRecherche etat={this.state.rech} chg={this.chgRech} />
                <CheckStock etat={this.state.chk} chg={this.chgCheck} />
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prix</th>
                        </tr>
                    </thead>

                    {rayons.map((ligne, key) => {
                        return <Rayon categ={ligne.category} key={key} tabProdRayon={this.renvoisProdRayon_old(ligne.category)}></Rayon>
                    })}

                </table>
            </section>
        )
    }
}

function Rayon(props) {
    return (
        <tbody key={props.key}>
            <tr className="categ">
                <td colSpan="2">
                    {props.categ}
                </td>
            </tr>
            {props.tabProdRayon.map((ligne, key2) => {
                return <Article ligne={ligne} key={key2}></Article>
            })}

        </tbody>

    )
}


function Article(props) {
    return (
        <tr className={(props.ligne.stocked == false) ? "rouge" : "vert"} key={props.key}>
            <td>
                {props.ligne.name}
            </td>
            <td>
                {props.ligne.price}
            </td>
        </tr>
    )
}

function InputRecherche(props) {
    return (
        <input type="text" placeholder="Saisissez votre recherche" value={props.etat} onChange={props.chg} />
    )
}
function CheckStock(props) {
    return (
        <div>
            <input type="checkbox" id="chkStock" checked={props.etat} onChange={props.chg} /> <label htmlFor="chkStock"> Uniquement les articles en stock</label>
        </div>
    )
}

ReactDOM.render(<Tableau />, document.getElementById("app"))