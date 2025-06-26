"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "./page-header"
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Flashcard } from "@/types"

const FLASHCARDS: Flashcard[] = [
  // DSA Questions (30 questions)
  {
    id: 1,
    topic: "DSA",
    question: "What is the time complexity of binary search?",
    answer:
      "O(log n) - Binary search eliminates half of the remaining elements in each iteration by comparing the target with the middle element.",
  },
  {
    id: 2,
    topic: "DSA",
    question: "What is the difference between Stack and Queue?",
    answer:
      "Stack follows LIFO (Last In First Out) principle with push/pop operations, while Queue follows FIFO (First In First Out) principle with enqueue/dequeue operations.",
  },
  {
    id: 3,
    topic: "DSA",
    question: "What is a Hash Table and its average time complexity?",
    answer:
      "A hash table is a data structure that maps keys to values using a hash function. Average time complexity: O(1) for search, insert, and delete operations.",
  },
  {
    id: 4,
    topic: "DSA",
    question: "Explain the difference between BFS and DFS.",
    answer:
      "BFS (Breadth-First Search) explores nodes level by level using a queue. DFS (Depth-First Search) explores as far as possible along each branch using a stack or recursion.",
  },
  {
    id: 5,
    topic: "DSA",
    question: "What is Dynamic Programming?",
    answer:
      "Dynamic Programming is an optimization technique that solves complex problems by breaking them into simpler subproblems and storing results to avoid redundant calculations.",
  },
  {
    id: 6,
    topic: "DSA",
    question: "What is the time complexity of QuickSort?",
    answer:
      "Best/Average case: O(n log n), Worst case: O(n²). The worst case occurs when the pivot is always the smallest or largest element.",
  },
  {
    id: 7,
    topic: "DSA",
    question: "What is a Binary Search Tree (BST)?",
    answer:
      "A BST is a binary tree where for each node, all values in the left subtree are smaller and all values in the right subtree are larger than the node's value.",
  },
  {
    id: 8,
    topic: "DSA",
    question: "What is the difference between Array and Linked List?",
    answer:
      "Arrays have fixed size and O(1) random access but O(n) insertion/deletion. Linked Lists have dynamic size and O(1) insertion/deletion but O(n) access time.",
  },
  {
    id: 9,
    topic: "DSA",
    question: "What is a Heap data structure?",
    answer:
      "A heap is a complete binary tree that satisfies the heap property: parent nodes are either greater (max-heap) or smaller (min-heap) than their children.",
  },
  {
    id: 10,
    topic: "DSA",
    question: "What is the Two Pointer technique?",
    answer:
      "Two Pointer is an algorithmic technique using two pointers to traverse data structures, commonly used for problems involving pairs, subarrays, or palindromes.",
  },
  {
    id: 11,
    topic: "DSA",
    question: "What is a Trie data structure?",
    answer:
      "A Trie (prefix tree) is a tree-like data structure used to store strings efficiently, where each node represents a character and paths represent words.",
  },
  {
    id: 12,
    topic: "DSA",
    question: "What is the Sliding Window technique?",
    answer:
      "Sliding Window is an optimization technique for problems involving subarrays/substrings by maintaining a window and sliding it to avoid redundant calculations.",
  },
  {
    id: 13,
    topic: "DSA",
    question: "What is Merge Sort's time complexity?",
    answer:
      "Merge Sort has O(n log n) time complexity in all cases (best, average, worst) and O(n) space complexity due to the merging process.",
  },
  {
    id: 14,
    topic: "DSA",
    question: "What is a Graph and its representations?",
    answer:
      "A Graph is a collection of vertices connected by edges. Main representations: Adjacency Matrix (O(V²) space) and Adjacency List (O(V+E) space).",
  },
  {
    id: 15,
    topic: "DSA",
    question: "What is the difference between Dijkstra's and Bellman-Ford algorithms?",
    answer:
      "Dijkstra's finds shortest paths from source to all vertices in O(V log V + E) but doesn't handle negative weights. Bellman-Ford handles negative weights in O(VE).",
  },

  // OS Questions (25 questions)
  {
    id: 16,
    topic: "OS",
    question: "What is a deadlock?",
    answer:
      "A deadlock is a situation where two or more processes are blocked forever, waiting for each other to release resources, creating a circular dependency.",
  },
  {
    id: 17,
    topic: "OS",
    question: "What is virtual memory?",
    answer:
      "Virtual memory is a memory management technique that provides an idealized abstraction of storage resources, allowing programs to use more memory than physically available.",
  },
  {
    id: 18,
    topic: "OS",
    question: "What are the four conditions for deadlock?",
    answer:
      "1. Mutual Exclusion 2. Hold and Wait 3. No Preemption 4. Circular Wait. All four must be present simultaneously for deadlock to occur.",
  },
  {
    id: 19,
    topic: "OS",
    question: "What is the difference between Process and Thread?",
    answer:
      "Process is an independent program with its own memory space. Thread is a lightweight process that shares memory space with other threads in the same process.",
  },
  {
    id: 20,
    topic: "OS",
    question: "What is paging in OS?",
    answer:
      "Paging is a memory management scheme that eliminates external fragmentation by dividing physical memory into fixed-size blocks called frames and logical memory into pages.",
  },
  {
    id: 21,
    topic: "OS",
    question: "What is the difference between preemptive and non-preemptive scheduling?",
    answer:
      "Preemptive scheduling can interrupt running processes to allocate CPU to higher priority processes. Non-preemptive scheduling waits for the current process to complete.",
  },
  {
    id: 22,
    topic: "OS",
    question: "What is a semaphore?",
    answer:
      "A semaphore is a synchronization primitive that controls access to shared resources by maintaining a counter and providing wait() and signal() operations.",
  },
  {
    id: 23,
    topic: "OS",
    question: "What is thrashing in OS?",
    answer:
      "Thrashing occurs when a system spends more time swapping pages in and out of memory than executing actual processes, leading to severe performance degradation.",
  },
  {
    id: 24,
    topic: "OS",
    question: "What is the difference between mutex and semaphore?",
    answer:
      "Mutex is a binary semaphore (0 or 1) used for mutual exclusion. Semaphore can have multiple values and is used for controlling access to multiple resources.",
  },
  {
    id: 25,
    topic: "OS",
    question: "What is context switching?",
    answer:
      "Context switching is the process of storing and restoring the state of a process or thread so that execution can be resumed from the same point later.",
  },

  // DBMS Questions (25 questions)
  {
    id: 26,
    topic: "DBMS",
    question: "What is ACID in database transactions?",
    answer:
      "ACID stands for Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), and Durability (permanent changes).",
  },
  {
    id: 27,
    topic: "DBMS",
    question: "What is normalization?",
    answer:
      "Database normalization is the process of organizing data to minimize redundancy and dependency by dividing large tables into smaller, related tables with proper relationships.",
  },
  {
    id: 28,
    topic: "DBMS",
    question: "What is the difference between INNER JOIN and OUTER JOIN?",
    answer:
      "INNER JOIN returns only matching records from both tables. OUTER JOIN (LEFT, RIGHT, FULL) returns matching records plus unmatched records from one or both tables.",
  },
  {
    id: 29,
    topic: "DBMS",
    question: "What is a primary key?",
    answer:
      "A primary key is a column or combination of columns that uniquely identifies each row in a table. It cannot contain NULL values and must be unique.",
  },
  {
    id: 30,
    topic: "DBMS",
    question: "What is the difference between DELETE, DROP, and TRUNCATE?",
    answer:
      "DELETE removes specific rows (can be rolled back), DROP removes entire table structure, TRUNCATE removes all rows but keeps structure (faster than DELETE).",
  },
  {
    id: 31,
    topic: "DBMS",
    question: "What is indexing in databases?",
    answer:
      "Indexing is a data structure technique to improve query performance by creating shortcuts to data locations, similar to an index in a book.",
  },
  {
    id: 32,
    topic: "DBMS",
    question: "What is a foreign key?",
    answer:
      "A foreign key is a column that creates a link between two tables by referencing the primary key of another table, ensuring referential integrity.",
  },
  {
    id: 33,
    topic: "DBMS",
    question: "What are the different normal forms?",
    answer:
      "1NF: Atomic values, 2NF: No partial dependencies, 3NF: No transitive dependencies, BCNF: Every determinant is a candidate key.",
  },
  {
    id: 34,
    topic: "DBMS",
    question: "What is a stored procedure?",
    answer:
      "A stored procedure is a precompiled collection of SQL statements stored in the database that can be executed as a single unit, improving performance and security.",
  },
  {
    id: 35,
    topic: "DBMS",
    question: "What is the difference between clustered and non-clustered index?",
    answer:
      "Clustered index physically reorders table data and there can be only one per table. Non-clustered index creates a separate structure pointing to data rows.",
  },

  // System Design Questions (20 questions)
  {
    id: 36,
    topic: "System Design",
    question: "What is load balancing?",
    answer:
      "Load balancing is the process of distributing incoming network traffic across multiple servers to ensure no single server bears too much demand, improving reliability and performance.",
  },
  {
    id: 37,
    topic: "System Design",
    question: "What is caching?",
    answer:
      "Caching is a technique to store frequently accessed data in a fast storage layer (like RAM) to reduce access time and improve application performance.",
  },
  {
    id: 38,
    topic: "System Design",
    question: "What is horizontal vs vertical scaling?",
    answer:
      "Horizontal scaling (scale out) adds more servers to handle load. Vertical scaling (scale up) increases the power of existing servers by adding CPU, RAM, etc.",
  },
  {
    id: 39,
    topic: "System Design",
    question: "What is a CDN (Content Delivery Network)?",
    answer:
      "A CDN is a distributed network of servers that deliver web content to users based on their geographic location, reducing latency and improving load times.",
  },
  {
    id: 40,
    topic: "System Design",
    question: "What is database sharding?",
    answer:
      "Database sharding is a method of horizontally partitioning data across multiple databases, where each shard contains a subset of the total data.",
  },
  {
    id: 41,
    topic: "System Design",
    question: "What is the CAP theorem?",
    answer:
      "CAP theorem states that a distributed system can only guarantee two of three properties: Consistency, Availability, and Partition tolerance.",
  },
  {
    id: 42,
    topic: "System Design",
    question: "What is microservices architecture?",
    answer:
      "Microservices is an architectural pattern where applications are built as a collection of small, independent services that communicate over well-defined APIs.",
  },
  {
    id: 43,
    topic: "System Design",
    question: "What is eventual consistency?",
    answer:
      "Eventual consistency is a consistency model where the system will become consistent over time, but may be temporarily inconsistent after updates.",
  },
  {
    id: 44,
    topic: "System Design",
    question: "What is a message queue?",
    answer:
      "A message queue is a communication method between services where messages are stored in a queue until they are processed, enabling asynchronous communication.",
  },
  {
    id: 45,
    topic: "System Design",
    question: "What is database replication?",
    answer:
      "Database replication is the process of copying and maintaining database objects in multiple databases across different locations for backup and performance.",
  },

  // Networking Questions (15 questions)
  {
    id: 46,
    topic: "Networking",
    question: "What is the OSI model?",
    answer:
      "The OSI model is a 7-layer conceptual framework: Physical, Data Link, Network, Transport, Session, Presentation, and Application layers for network communication.",
  },
  {
    id: 47,
    topic: "Networking",
    question: "What is the difference between TCP and UDP?",
    answer:
      "TCP is connection-oriented, reliable, and ensures data delivery with error checking. UDP is connectionless, faster, but doesn't guarantee delivery or order.",
  },
  {
    id: 48,
    topic: "Networking",
    question: "What is HTTP vs HTTPS?",
    answer:
      "HTTP is unsecured protocol for web communication. HTTPS is HTTP with SSL/TLS encryption, providing secure data transmission between client and server.",
  },
  {
    id: 49,
    topic: "Networking",
    question: "What is DNS?",
    answer:
      "DNS (Domain Name System) translates human-readable domain names (like google.com) into IP addresses that computers use to identify each other on the network.",
  },
  {
    id: 50,
    topic: "Networking",
    question: "What is a subnet mask?",
    answer:
      "A subnet mask is used to divide an IP address into network and host portions, determining which part of the IP address refers to the network and which part refers to the host.",
  },

  // Programming Concepts (15 questions)
  {
    id: 51,
    topic: "Programming",
    question: "What is Object-Oriented Programming?",
    answer:
      "OOP is a programming paradigm based on objects containing data (attributes) and code (methods). Key principles: Encapsulation, Inheritance, Polymorphism, Abstraction.",
  },
  {
    id: 52,
    topic: "Programming",
    question: "What is the difference between abstract class and interface?",
    answer:
      "Abstract class can have both abstract and concrete methods, supports constructors. Interface only has abstract methods (in most languages) and supports multiple inheritance.",
  },
  {
    id: 53,
    topic: "Programming",
    question: "What is polymorphism?",
    answer:
      "Polymorphism allows objects of different types to be treated as instances of the same type through a common interface, enabling method overriding and overloading.",
  },
  {
    id: 54,
    topic: "Programming",
    question: "What is encapsulation?",
    answer:
      "Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), hiding internal implementation details from outside access.",
  },
  {
    id: 55,
    topic: "Programming",
    question: "What is the difference between stack and heap memory?",
    answer:
      "Stack stores local variables and function calls (LIFO, fast access). Heap stores dynamically allocated objects (slower access, larger space, manual management).",
  },

  // Web Development (10 questions)
  {
    id: 56,
    topic: "Web Dev",
    question: "What is REST API?",
    answer:
      "REST (Representational State Transfer) is an architectural style for web services using HTTP methods (GET, POST, PUT, DELETE) and stateless communication.",
  },
  {
    id: 57,
    topic: "Web Dev",
    question: "What is the difference between cookies and sessions?",
    answer:
      "Cookies are stored on client-side with size limits. Sessions are stored on server-side and more secure, but require server resources and session management.",
  },
  {
    id: 58,
    topic: "Web Dev",
    question: "What is CORS?",
    answer:
      "CORS (Cross-Origin Resource Sharing) is a security mechanism that allows web pages to make requests to a different domain than the one serving the web page.",
  },
  {
    id: 59,
    topic: "Web Dev",
    question: "What is JWT?",
    answer:
      "JWT (JSON Web Token) is a compact, URL-safe token format for securely transmitting information between parties as a JSON object, commonly used for authentication.",
  },
  {
    id: 60,
    topic: "Web Dev",
    question: "What is the difference between SQL and NoSQL databases?",
    answer:
      "SQL databases are relational, use structured schemas, and support ACID properties. NoSQL databases are non-relational, flexible schemas, and designed for scalability.",
  },
]

export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string>("All")

  // Filter flashcards based on selected topic
  const filteredCards = selectedTopic === "All" ? FLASHCARDS : FLASHCARDS.filter((card) => card.topic === selectedTopic)

  const currentCard = filteredCards[currentIndex]

  // Get unique topics for filter
  const topics = ["All", ...Array.from(new Set(FLASHCARDS.map((card) => card.topic)))]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length)
    setIsFlipped(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  // Reset index when topic changes
  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const getTopicColor = (topic: string) => {
    const colors = {
      DSA: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      OS: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      DBMS: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      "System Design": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      Networking: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      Programming: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
      "Web Dev": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    }
    return colors[topic as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  if (!currentCard) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Smart Flashcards"
          description="Master key concepts with interactive flashcards"
          icon={<BookOpen className="h-8 w-8 text-green-600" />}
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">No flashcards found for the selected topic.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Flashcards"
        description={`Master key concepts with ${FLASHCARDS.length}+ interactive flashcards covering DSA, OS, DBMS, System Design, and more`}
        icon={<BookOpen className="h-8 w-8 text-green-600" />}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Topic Filter */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedTopic} onValueChange={handleTopicChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic} {topic !== "All" && `(${FLASHCARDS.filter((c) => c.topic === topic).length})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">Showing {filteredCards.length} cards</div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {filteredCards.length}
            {selectedTopic !== "All" && ` • ${selectedTopic} Topic`}
          </p>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <Card
          className="min-h-[400px] cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          onClick={flipCard}
        >
          <CardContent className="p-8 flex flex-col justify-center items-center text-center h-full">
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getTopicColor(currentCard.topic)}`}
              >
                {currentCard.topic}
              </span>
            </div>

            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {isFlipped ? "Answer" : "Question"}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg min-h-[120px] flex items-center justify-center">
                {isFlipped ? currentCard.answer : currentCard.question}
              </p>
            </div>

            <div className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Click to {isFlipped ? "see question" : "reveal answer"}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCard}
            disabled={filteredCards.length <= 1}
            className="hover:bg-muted/80 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={flipCard}
            className="px-6 gap-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 hover:from-green-100 hover:to-blue-100 dark:hover:from-green-900/30 dark:hover:to-blue-900/30"
          >
            <RotateCcw className="h-4 w-4" />
            Flip Card
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextCard}
            disabled={filteredCards.length <= 1}
            className="hover:bg-muted/80 bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {topics.slice(1).map((topic) => {
            const count = FLASHCARDS.filter((c) => c.topic === topic).length
            return (
              <Card
                key={topic}
                className="text-center p-3 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTopicChange(topic)}
              >
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${getTopicColor(topic).split(" ")[0]}`} />
                <div className="text-sm font-medium">{topic}</div>
                <div className="text-xs text-muted-foreground">{count} cards</div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
