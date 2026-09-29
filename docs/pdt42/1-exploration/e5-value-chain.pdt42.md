# Map the value chain

```pdt42
:::canvas
id: cv-wardley-into-use
canvas: wardley-map
of: ar-into-use
:::
```

*The value chain of the focus arena "Getting apps into use" as it works today, without lernapps.net. It is based on the owners' own observations.*

## User needs

There is not one user need but three, one per group that wants an app to be used. All three rest on the same app, but for different reasons.

### Students understand the subject to get good grades

Students want to understand the subject well so that they write good grades. This matches their job "find an app to prepare for the next test".

```pdt42
:::component
id: c-need-students
title: Students understand the subject to get good grades
arena: ar-into-use
visibility: 100
entity: e-students
needs: c-app, c-discoverability
:::
```

### Parents support their children's learning with little time

Parents want the same as their children, but have little time to take care of it actively. An app that keeps their children learning on their own fills this gap.

```pdt42
:::component
id: c-need-parents
title: Parents support their children's learning with little time
arena: ar-into-use
visibility: 95
entity: e-adopters
needs: c-app, c-bring-to-students
:::
```

### Teachers gain free time by keeping students busy

Teachers want to gain free time by keeping students busy with an app. Their reasons differ: time for individual support, time to prepare other things, and more.

```pdt42
:::component
id: c-need-teachers
title: Teachers gain free time by keeping students busy
arena: ar-into-use
visibility: 90
entity: e-adopters
needs: c-app, c-bring-to-students
:::
```

## Components

### The app

The small educational app itself: the part students see and work with.

```pdt42
:::component
id: c-app
title: Small educational app
arena: ar-into-use
visibility: 80
needs: c-hosting, c-devices, c-ai-assistants
:::
```

### Bringing the app to students

Adults use every available channel to get an app in front of their students: link, QR code, projector, school tablets.

```pdt42
:::component
id: c-bring-to-students
title: Bringing the app to students
arena: ar-into-use
visibility: 70
needs: c-discoverability, c-fitness-signal, c-devices
:::
```

### Discoverability

How an app is found: by word of mouth, on teacher platforms, on social media or on GitHub. Students also look for apps themselves.

```pdt42
:::component
id: c-discoverability
title: Discoverability of apps
arena: ar-into-use
visibility: 60
:::
```

### Signal of fitness for use

What tells an adult that an app may be used: above all privacy, and the lowest possible barriers (no installation, no sign-up). Today each teacher judges this alone or asks a gatekeeper.

```pdt42
:::component
id: c-fitness-signal
title: Signal of fitness for use
arena: ar-into-use
visibility: 55
:::
```

### Hosting

Where the app runs, for example GitHub Pages. It is a pure convenience: available to anyone, for free.

```pdt42
:::component
id: c-hosting
title: Hosting
arena: ar-into-use
visibility: 25
evolution: commodity
:::
```

### AI assistants

The tools apps are built with, and a way students find apps. There are many of them, but they are currently becoming part of every household's basic equipment.

```pdt42
:::component
id: c-ai-assistants
title: AI assistants
arena: ar-into-use
visibility: 20
evolution: commodity
entity: e-ai-assistants
:::
```

### Devices and connectivity

The devices and the network the app runs on, at school and at home.

```pdt42
:::component
id: c-devices
title: Devices and connectivity
arena: ar-into-use
visibility: 15
:::
```
