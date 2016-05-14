/**
 * Menuzator Script
 * Should recieve an input and output an menu
 * By Arthur Annibal - WebAniversario
 * Version 0.0.0
 */

if (typeof wNiver == "undefined") {throw "WebAniversario 'wNiver' Object was not found"}

var currentPage = "Dashboard";

wNiver.menuzator = {
	/** Bits and stuff about the menu */
	config : {
		
	},
	
	menuHierarchy : [
		{
			name:"Dashboard",
			active:true,
			content:"<i class='fa fa-tachometer fa-lg' ></i>",
			href:"index.html",
			children:[]
		},
		{
			name:"Perfil do Usuário",
			active:true,
			content:"<i class='fa fa-user fa-lg' ></i>",
			href:"index.html",
			children:[
				{
					name:"Sair do sistema",
					active:true,
					content:"<span>Logout</span>",
					href:"#",
					onclick:function() { verbose("logout"); },
					children:[]
				},
				{
					name:"Trocar de Usuário",
					active:false,
					content:"<span>Usuário</span>",
					href:"#",
					onclick:function() { verbose("user"); },
					children:[]
				},
				{
					name:"Exemplo",
					active:false,
					content:"<span>Submenu</span>",
					href:"#",
					onclick:function() { verbose("submenu"); },
					children:[
						{
							name:"Exemplo 1",
							active:true,
							content:"<span>Submenu</span>",
							href:"#",
							onclick:function() { verbose("submenu"); },
							children:[
								{
									name:"Exemplo 1",
									active:true,
									content:"<span>Submenu</span>",
									href:"#",
									onclick:function() { verbose("submenu"); },
									children:[],
								},
								{
									name:"Exemplo 2",
									active:false,
									content:"<span>Submenu 2</span>",
									href:"#",
									onclick:function() { verbose("submenu"); },
									children:[],
								},
								{
									name:"Exemplo 3",
									active:false,
									content:"<span>Submenu 3</span>",
									href:"#",
									onclick:function() { verbose("submenu"); },
									children:[],
								}
							],
						},
						{
							name:"Exemplo 2",
							active:false,
							content:"<span>Submenu 2</span>",
							href:"#",
							onclick:function() { verbose("submenu"); },
							children:[
								{
									name:"Exemplo 1",
									active:true,
									content:"<span>Submenu</span>",
									href:"#",
									onclick:function() { verbose("submenu"); },
									children:[],
								},
								{
									name:"Exemplo 2",
									active:false,
									content:"<span>Submenu 2</span>",
									href:"#",
									onclick:function() { verbose("submenu"); },
									children:[],
								},
								{
									name:"Exemplo 3",
									active:false,
									content:"<span>Submenu 3</span>",
									href:"#",
									onclick:function() { verbose("submenu"); },
									children:[],
								}
							],
						},
						{
							name:"Exemplo 3",
							active:false,
							content:"<span>Submenu 3</span>",
							href:"#",
							onclick:function() { verbose("submenu"); },
							children:[],
						}
					]
				},
				{
					name:"Trocar de Usuário",
					active:true,
					content:"<span>Item 4</span>",
					href:"#",
					onclick:function() { verbose("user"); },
					children:[]
				}
			]
		},
		{
			name:"Configurações do Evento",
			active:true,
			content:"<i class='fa fa-calendar fa-lg' ></i>",
			href:"index.html",
			children:[]
		},
		{
			name:"Configurações de Compartilhamento",
			active:false,
			content:"<i class='fa fa-share-alt fa-lg' ></i>",
			href:"index.html",
			children:[]
		},
		{
			name:"Lista de Convidados",
			active:true,
			content:"<i class='fa fa-users fa-lg' ></i>",
			href:"index.html",
			children:[]
		},
		{
			name:"Lista de Presentes",
			active:true,
			content:"<i class='fa fa-gift fa-lg' ></i>",
			href:"index.html",
			children:[]
		},
		{
			name:"Configurações Gerais",
			active:true,
			content:"<i class='fa fa-cog fa-lg' ></i>",
			href:"index.html",
			children:[]
		}
	],
	
	createMenuItem : function(item, itemContainer) {
		var itemListItem = $("<li></li>").addClass("menu-item");
		if (item.active == false) itemListItem.addClass("menu-item-inactive");
		if (item.name == currentPage) itemListItem.addClass("menu-item-current");
		verbose ("Created <li>: ",itemListItem);
		
		var itemLink = $("<a></a>").attr("href",item.href).attr("title",item.name).addClass("menu-link");
		if (typeof item.onclick != "undefined") itemLink.on("click", item.onclick);
		verbose("Create <a>: ", itemLink);
		
		var itemContents = $(item.content);
		verbose ("Item contents: ", itemContents);
		
		itemContents.appendTo(itemLink);
		itemLink.appendTo(itemListItem);
		
		if (typeof item.children != "undefined" && item.children.length > 0) {
			var itemSubitemContainer = $("<ul></ul>").addClass("submenu");
			for (var i=0; i<item.children.length; i++) {
				wNiver.menuzator.createMenuSubitem(item.children[i], itemSubitemContainer);
			}
			itemSubitemContainer.appendTo(itemListItem);
		}
		
		verbose("Appended to", itemContainer);
		itemListItem.appendTo(itemContainer);
	},
	
	createMenuSubitem : function(item, itemContainer) {
		var itemListItem = $("<li></li>").addClass("submenu-item");
		if (item.active == false) itemListItem.addClass("submenu-item-inactive");
		if (item.name == currentPage) itemListItem.addClass("submenu-item-current");
		verbose ("Created <li>: ",itemListItem);
		
		var itemLink = $("<a></a>").attr("href",item.href).attr("title",item.name).addClass("submenu-link");
		if (typeof item.onclick != "undefined") itemLink.on("click", item.onclick);
		verbose("Create <a>: ", itemLink);
		
		var itemContents = $(item.content);
		verbose ("Item contents: ", itemContents);
		
		itemContents.appendTo(itemLink);
		itemLink.appendTo(itemListItem);
		
		if (typeof item.children != "undefined" && item.children.length > 0) {
			var itemSubitemContainer = $("<ul></ul>").addClass("submenu");
			for (var i=0; i<item.children.length; i++) {
				wNiver.menuzator.createMenuSubitem(item.children[i], itemSubitemContainer);
			}
			itemSubitemContainer.appendTo(itemListItem);
		}
		
		verbose("Appended to", itemContainer);
		itemListItem.appendTo(itemContainer);
	},

	processMenuHierarchy : function() {
		var menuItemContainer = $("<ul></ul>").addClass("menu");
		for (i=0; i<this.menuHierarchy.length; i++) {
			wNiver.menuzator.createMenuItem(this.menuHierarchy[i], menuItemContainer);
		}
		menuItemContainer.appendTo("#menu");
	},
	
	initialize:function() {
		this.processMenuHierarchy();
	}
	
}

































