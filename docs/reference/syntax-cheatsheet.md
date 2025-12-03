# COON Syntax Cheatsheet

Quick reference for COON format abbreviations and syntax patterns.

## Widget Abbreviations

| Abbreviation | Widget | Example |
|--------------|--------|---------|
| `C` | Container | `C{w:100,h:50}` |
| `T` | Text | `T"Hello"` |
| `R` | Row | `R[...]` |
| `Col` | Column | `Col[...]` |
| `Stk` | Stack | `Stk[...]` |
| `Ctr` | Center | `Ctr[...]` |
| `P` | Padding | `P{p:8}[...]` |
| `SB` | SizedBox | `SB{w:10,h:20}` |
| `Ic` | Icon | `Ic.star` |
| `Img` | Image | `Img.net"url"` |
| `Btn` | ElevatedButton | `Btn{onP:_fn}[T"Click"]` |
| `TBtn` | TextButton | `TBtn{onP:_fn}[...]` |
| `IBtn` | IconButton | `IBtn{onP:_fn,ic:Ic.add}` |
| `FAB` | FloatingActionButton | `FAB{onP:_fn}[Ic.add]` |
| `Scf` | Scaffold | `Scf{aB:AppB{t:T"Title"}}` |
| `AppB` | AppBar | `AppB{t:T"Title"}` |
| `TF` | TextField | `TF{ctrl:_c,hint:"Enter"}` |
| `LV` | ListView | `LV.b[...]` |
| `GV` | GridView | `GV.c{cC:2}[...]` |
| `Card` | Card | `Card[...]` |
| `Exp` | Expanded | `Exp[...]` |
| `Flx` | Flexible | `Flx{flex:2}[...]` |
| `Opac` | Opacity | `Opac{o:0.5}[...]` |
| `Ign` | IgnorePointer | `Ign[...]` |
| `Abs` | AbsorbPointer | `Abs[...]` |
| `GD` | GestureDetector | `GD{onTap:_fn}[...]` |
| `InkW` | InkWell | `InkW{onTap:_fn}[...]` |

## Property Abbreviations

| Abbreviation | Property | Values |
|--------------|----------|--------|
| `w` | width | number |
| `h` | height | number |
| `c` | color | `Cl.red`, `#FF0000` |
| `bg` | backgroundColor | color |
| `p` | padding | number or EdgeInsets |
| `m` | margin | number or EdgeInsets |
| `br` | borderRadius | number |
| `mA` | mainAxisAlignment | `start`, `end`, `center`, `spB`, `spA`, `spE` |
| `cA` | crossAxisAlignment | `start`, `end`, `center`, `str` |
| `t` | title | Widget |
| `l` | leading | Widget |
| `a` | actions | List of Widgets |
| `onP` | onPressed | function |
| `onTap` | onTap | function |
| `ctrl` | controller | TextEditingController |
| `hint` | hintText | string |
| `flex` | flex | number |
| `o` | opacity | 0.0-1.0 |
| `cC` | crossAxisCount | number (GridView) |
| `ch` | child | Widget |
| `chn` | children | List of Widgets |
| `aB` | appBar | AppBar |
| `bod` | body | Widget |
| `fab` | floatingActionButton | FAB |
| `bnb` | bottomNavigationBar | Widget |

## MainAxisAlignment Values

| Abbreviation | Value |
|--------------|-------|
| `start` | MainAxisAlignment.start |
| `end` | MainAxisAlignment.end |
| `center` | MainAxisAlignment.center |
| `spB` | MainAxisAlignment.spaceBetween |
| `spA` | MainAxisAlignment.spaceAround |
| `spE` | MainAxisAlignment.spaceEvenly |

## CrossAxisAlignment Values

| Abbreviation | Value |
|--------------|-------|
| `start` | CrossAxisAlignment.start |
| `end` | CrossAxisAlignment.end |
| `center` | CrossAxisAlignment.center |
| `str` | CrossAxisAlignment.stretch |
| `bl` | CrossAxisAlignment.baseline |

## Color Abbreviations

| Abbreviation | Color |
|--------------|-------|
| `Cl.r` | Colors.red |
| `Cl.g` | Colors.green |
| `Cl.b` | Colors.blue |
| `Cl.w` | Colors.white |
| `Cl.bl` | Colors.black |
| `Cl.gr` | Colors.grey |
| `Cl.t` | Colors.transparent |
| `Cl.o` | Colors.orange |
| `Cl.y` | Colors.yellow |
| `Cl.p` | Colors.purple |
| `Cl.pk` | Colors.pink |
| `Cl.cy` | Colors.cyan |
| `Cl.te` | Colors.teal |
| `Cl.in` | Colors.indigo |
| `Cl.am` | Colors.amber |

## Keyword Abbreviations

| Abbreviation | Keyword |
|--------------|---------|
| `c:` | class |
| `fn:` | function |
| `m:` | method |
| `@o` | @override |
| `ret` | return |
| `$` | this |
| `_` | private |
| `<` | extends |
| `>` | implements |
| `~` | mixin |
| `?` | nullable |
| `!` | required |
| `=>` | arrow function |

## Class Definition Syntax

```
c:ClassName<SuperClass
```

**Example:**
```
c:MyWidget<StatelessWidget
```

Expands to:
```dart
class MyWidget extends StatelessWidget
```

## Method Definition Syntax

```
m:methodName(params)->ReturnType{body}
```

**Example:**
```
m:build(ctx)->W{ret C{c:Cl.r}}
```

Expands to:
```dart
Widget build(BuildContext context) {
  return Container(color: Colors.red);
}
```

## Widget Tree Syntax

**Children:** Use `[...]` for children list
```
Col[T"A",T"B",T"C"]
```

**Properties:** Use `{...}` for properties
```
C{w:100,h:50,c:Cl.r}
```

**Combined:**
```
C{p:16}[Col{mA:center}[T"Hello",SB{h:10},T"World"]]
```

## Full Examples

### Simple Widget

**COON:**
```
C{c:Cl.b,br:8,p:16}[T"Hello World"]
```

**Dart:**
```dart
Container(
  color: Colors.blue,
  borderRadius: BorderRadius.circular(8),
  padding: EdgeInsets.all(16),
  child: Text("Hello World"),
)
```

### ListView with Items

**COON:**
```
LV.b[C{m:8}[T"Item 1"],C{m:8}[T"Item 2"]]
```

**Dart:**
```dart
ListView.builder(
  children: [
    Container(margin: EdgeInsets.all(8), child: Text("Item 1")),
    Container(margin: EdgeInsets.all(8), child: Text("Item 2")),
  ],
)
```

### Scaffold with AppBar

**COON:**
```
Scf{aB:AppB{t:T"My App",a:[IBtn{ic:Ic.set,onP:_onSet}]},bod:Ctr[T"Content"],fab:FAB{onP:_onAdd}[Ic.add]}
```

**Dart:**
```dart
Scaffold(
  appBar: AppBar(
    title: Text("My App"),
    actions: [
      IconButton(icon: Icon(Icons.settings), onPressed: _onSettings),
    ],
  ),
  body: Center(child: Text("Content")),
  floatingActionButton: FloatingActionButton(
    onPressed: _onAdd,
    child: Icon(Icons.add),
  ),
)
```

### Complete StatelessWidget Class

**COON:**
```
c:HomePage<StatelessWidget;@o m:b(ctx)->W{ret Scf{aB:AppB{t:T"Home"},bod:Col{mA:center,cA:center}[Ic.home{sz:64,c:Cl.b},SB{h:16},T"Welcome Home"]}}
```

**Dart:**
```dart
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Home")),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(Icons.home, size: 64, color: Colors.blue),
          SizedBox(height: 16),
          Text("Welcome Home"),
        ],
      ),
    );
  }
}
```

## Edge Cases

### Empty Widgets

```
C{}          # Empty Container
SB{}         # Empty SizedBox
Col[]        # Empty Column
```

### Nested Functions

```
GD{onTap:()=>_nav(ctx,'home')}[T"Go"]
```

### String Escaping

```
T"Hello \"World\""      # Escaped quotes
T'It\'s working'        # Single quote escaping
```

### Multi-line COON

```
c:App<StatelessWidget;
@o m:b(ctx)->W{
  ret Scf{
    aB:AppB{t:T"App"},
    bod:Col[T"Line1",T"Line2"]
  }
}
```
